import { Controller } from "@core/infra/Controller";
import { HttpResponse } from "@core/infra/HttpResponse";

export class ExampleUseCase implements Controller {
	async handle(request: any): Promise<HttpResponse>{
		throw new Error('Method not implemented')
	};
}