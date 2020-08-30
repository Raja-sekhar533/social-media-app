import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent} from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';

import { AuthGuard } from './auth/auth.guard';
import { UserComponent } from './auth/user/user.component';


const routes: Routes = [
    { path: '',component: PostListComponent},
    { path: 'create', component: PostCreateComponent , canActivate:[AuthGuard]},
    { path: 'edit/:postId', component: PostCreateComponent, canActivate:[AuthGuard]},
    { path: "auth", loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule)},
    {path: "user", component:UserComponent}
    
]

@NgModule({
imports: [RouterModule.forRoot(routes)],

exports:[RouterModule],
providers:[AuthGuard]
})
export class AppRoutingModule {}