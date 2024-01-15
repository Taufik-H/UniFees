import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userReportRouter = createTRPCRouter({
  createReport: protectedProcedure
    .input(
      z.object({
        location: z.string(),
        foodPrizeFrom: z.number(),
        foodPrizeTo: z.number(),
        transportationPrizeFrom: z.number(),
        transportationPrizeTo: z.number(),
        costPrizeFrom: z.number(),
        costPrizeTo: z.number(),
        longitude: z.number(),
        latitude: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId: string = String(ctx.session.user.id);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ctx.db.userReport.create({
        data: {
          location: input.location,
          foodPrizeFrom: input.foodPrizeFrom,
          foodPrizeTo: input.foodPrizeTo,
          transportationPrizeFrom: input.transportationPrizeFrom,
          transportationPrizeTo: input.transportationPrizeTo,
          costPrizeFrom: input.costPrizeFrom,
          costPrizeTo: input.costPrizeTo,
          longitude: input.longitude,
          latitude: input.latitude,
          userId: userId,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.userReport.findMany();
  }),

  getById: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.userReport.findUnique({
      where: { id: input },
    });
  }),
  findReportsInRadius: publicProcedure
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
