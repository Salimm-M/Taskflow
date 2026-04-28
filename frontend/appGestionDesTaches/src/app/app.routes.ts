import { Routes } from '@angular/router';
import { Login } from './login/login';
import { AdminLayout } from './admin/admin-layout/admin-layout';
import { AdminDashbord } from './admin-dashbord/admin-dashbord';
import { GestionUser } from './admin/gestion-user/gestion-user';
import { GestionDeTache } from './admin/gestion-de-tache/gestion-de-tache';
import { GestionProjet } from './admin/gestion-projet/gestion-projet';
import { Component } from '@angular/core';
import { ChefLayout } from './user/chefDeProjet/chef-layout/chef-layout';
import { Dashbord } from './user/chefDeProjet/dashbord/dashbord';
import { MonEquipe } from './user/chefDeProjet/mon-equipe/mon-equipe';
import { Projet } from './user/chefDeProjet/projet/projet';
import { DashbordD } from './user/dev/dashbord-d/dashbord-d';

import { Layout } from './user/dev/layout/layout';
import { Parametre } from './parametre/parametre';
import { test } from './test/test';
import { KanbanTask } from './user/dev/kanban-task/kanban-task';
import { Validation } from './user/chefDeProjet/validation/validation';
import { ListeTache } from './user/chefDeProjet/liste-tache/liste-tache';
import { adminGuard, chefGuard, devGuard } from './guards/role-guard';

export const routes: Routes = [{ path: '', component:   Login },
    {path:"login",component:Login}
    ,{path:"admin",component:AdminLayout,canActivate:[adminGuard],
        children:[
            {path:"dashbord",component:AdminDashbord},
            {path:"gestionUtilisateur",component:GestionUser},
            {path:"gestionTache",component:GestionDeTache},
            {path:"gestionProjet",component:GestionProjet},
            {path:"parametre",component:Parametre}

        ]},{path:"chef",component:ChefLayout,canActivate:[chefGuard],children:[  
            {path:"dashbord",component:Dashbord},
             {path:"equipe",component:MonEquipe},
             {path:"projet",component:Projet},
              {path:"parametre",component:Parametre},
              {path:"validation",component:Validation}
        ]},{path:"dev",component:Layout,canActivate:[devGuard],children:[  
            {path:"dashbord",component:DashbordD},
             {path:"kanban",component:KanbanTask},
             {path:"projet",component:Projet},
             {path:"parametre",component:Parametre}
        ]}
];
