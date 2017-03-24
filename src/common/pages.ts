import { ReduxRoute } from "../services/router.service";
import { HomePage } from "../pages/home/home";

export const pages: ReduxRoute[] = [
	{
		name: "default",
		class: HomePage
	}
]
