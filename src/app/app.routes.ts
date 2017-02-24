import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { ArticleListComponent } from './article-list/article-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'news/abc-news-au',
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'news/:sourceKey',
    component: ArticleListComponent
  }
  //{ path: '/profile/:username/feed', component: FeedPage, name: 'ProfileFeed' },
];

export const appRoutes =
  RouterModule.forRoot(routes);
