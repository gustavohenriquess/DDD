import { Controller } from "@core/infra/Controller";
import { HttpResponse } from "@core/infra/HttpResponse";

export class ExampleController implements Controller {
	async handle(request: RequestData): Promise<HttpResponse>{
		throw new Error('Method not implemented')
	};
}

type RequestData = {
	
}