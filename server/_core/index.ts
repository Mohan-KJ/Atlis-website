import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { publicPlatformScript } from "./publicConfig";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { getDb } from "../db";
import { leads } from "../../drizzle/schema";
import { createHash } from "crypto";

const clean = (value: unknown, max = 500) => typeof value === "string" ? value.replace(/<[^>]*>/g, "").trim().slice(0, max) : "";
async function startServer() {
  const app = express(); const server = createServer(app);
  app.use(express.json({ limit: "50mb" })); app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.get("/api/platform/config.js", (_req, res) => res.set("Cache-Control", "no-store").type("application/javascript").send(publicPlatformScript()));
  app.post("/api/pilot", async (req, res) => {
    const body = req.body ?? {}; if (clean(body.website)) return res.status(400).json({ error: "Invalid request" });
    const email = clean(body.email, 320); const message = clean(body.message, 500);
    if (!clean(body.role, 120) || !clean(body.hospital, 240) || !clean(body.name, 160) || !email || !email.includes("@") || !body.consent || /https?:\/\//i.test(message)) return res.status(400).json({ error: "Please check the required fields." });
    const db = await getDb(); if (db) await db.insert(leads).values({ role: clean(body.role, 120), hospital: clean(body.hospital, 240), name: clean(body.name, 160), email, city: clean(body.city, 160), beds: clean(body.beds, 80), monthly: clean(body.monthly, 80), insurers: JSON.stringify(Array.isArray(body.insurers) ? body.insurers.map((x: unknown) => clean(x, 80)) : []), message, consentTextVersion: "pilot-v1", consentAt: new Date(), ipHash: createHash("sha256").update(String(req.ip)).digest("hex"), status: "new" });
    return res.status(201).json({ ok: true });
  });
  registerOAuthRoutes(app);
  app.use("/api/trpc", createExpressMiddleware({ router: appRouter, createContext }));
  if (process.env.NODE_ENV === "development") await setupVite(app, server); else serveStatic(app);
  const port = Number(process.env.PORT || "3000"); if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Invalid PORT");
  server.on("error", error => { console.error("Server failed:", error.message); process.exit(1); }); server.listen(port, "0.0.0.0", () => console.log(`Server listening on port ${port}`));
}
startServer().catch(error => { console.error(error); process.exit(1); });
