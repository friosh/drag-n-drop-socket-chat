import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainViewComponent} from './pages/main-view/main-view.component';
import {ChatComponent} from './pages/chat/chat.component';

const routes: Routes = [
  {path: '', component: MainViewComponent},
  {path: 'chat', component: ChatComponent}
]

@NgModule(({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}))
export class AppRoutingModule {}
