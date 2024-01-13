import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userReportRouter = createTRPCRouter({
  findReportsInRadius: protectedProcedure
    .input(
      z.object({
        latitude: z.number(),
        longitude: z.number(),
        radiusMeter: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      /**
     * Example
     * `SELECT id, name, ST_X(location::geometry), ST_Y(location::geometry) 
            FROM "PointOfInterest" 
            ORDER BY ST_DistanceSphere(location::geometry, ST_MakePoint(${latitude}, ${longitude})) DESC`
     */
      const radius = input.radiusMeter / 111_000;
      return ctx.db.userReport.findMany({
        where: {
          AND: [
            { latitude: { gte: input.latitude - radius } },
            { latitude: { lte: input.latitude + radius } },
            { longitude: { gte: input.longitude - radius } },
            { longitude: { lte: input.longitude + radius } },
          ],
        },
      });
    }),
});
