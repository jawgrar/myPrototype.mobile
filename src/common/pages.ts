import { ReduxRoute } from "../services/router.service";
import { HomePage } from "../pages/home/home";

// pages
import { FirstRunPage } from '../pages/pages';
import { CardsPage } from '../pages/cards/cards';
import { ContentPage } from '../pages/content/content';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { WelcomePage } from '../pages/welcome/welcome';
import { ListMasterPage } from '../pages/list-master/list-master';
import { MenuPage } from '../pages/menu/menu';
import { SettingsPage } from '../pages/settings/settings';
import { SearchPage } from '../pages/search/search';


export const reduxRoutes: ReduxRoute[] = [
	{ name: "default", class: HomePage },
	{ name: 'tutorial', class: TutorialPage },
	{ name: 'welcome', class: WelcomePage },
	{ name: 'tabs', class: TabsPage },
	{ name: 'cards', class: CardsPage },
	{ name: 'content', class: ContentPage },
	{ name: 'login', class: LoginPage },
	{ name: 'signup', class: SignupPage },
	{ name: 'map', class: MapPage },
	{ name: 'master-detail', class: ListMasterPage },
	{ name: 'menu', class: MenuPage },
	{ name: 'settings', class: SettingsPage },
	{ name: 'search', class: SearchPage }
];
