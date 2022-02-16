import { Controller } from "@/presentation/protocols";

export const adaptResolver = async (
  controller: Controller,
  args?: any,
  context?: any
): Promise<any> => {
  const request = Object.assign({}, args);
  const response = await controller.handle(request);

  return response.body;
};
