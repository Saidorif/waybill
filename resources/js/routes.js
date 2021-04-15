import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import {TokenService} from './services/storage.service'
import {ability} from "./store/store";
import store from "./store/store";

// Dashboard component
import Dashboard from './components/admin/Dashboard'
import Admin from './components/admin/layouts/Admin'
import Master from './components/layouts/Master'
import Login from './components/auth/login'
import sendApply from './components/auth/sendApply'
import Register from './components/auth/register'
import Forgot from './components/auth/forgot'
import Profile from './components/admin/user/Profile'


// Employee
import Employee from './components/admin/employee/Employee'
import AddEmployee from './components/admin/employee/AddEmployee'
import EditEmployee from './components/admin/employee/EditEmployee'

// Role
import Role from './components/admin/role/Role'
import AddRole from './components/admin/role/AddRole'
import EditRole from './components/admin/role/EditRole'
import Permission from './components/admin/permission/Permission'

// Position
import Position from './components/admin/position/Position'
import AddPosition from './components/admin/position/AddPosition'
import EditPosition from './components/admin/position/EditPosition'

// client
import Client from './components/admin/client/Client'
import AddClient from './components/admin/client/AddClient'
import EditClient from './components/admin/client/EditClient'

// controller
import Conts from './components/admin/conts/Conts'
import AddConts from './components/admin/conts/AddConts'
import EditConts from './components/admin/conts/EditConts'

// controller
import Action from './components/admin/action/Action'
import AddAction from './components/admin/action/AddAction'
import EditAction from './components/admin/action/EditAction'

// Region
import Region from './components/admin/region/Region'
import AddRegion from './components/admin/region/AddRegion'
import EditRegion from './components/admin/region/EditRegion'

// Area
import Area from './components/admin/area/Area'
import AddArea from './components/admin/area/AddArea'
import EditArea from './components/admin/area/EditArea'

// apply
import Apply from './components/admin/apply/Apply'

// Home
import Home from './components/pages/Home'
import Contact from './components/pages/Contact'
import About from './components/pages/About'
import CheckContract from './components/pages/CheckContract'
import TenderList from './components/pages/TenderList'
import TenderListCompleted from './components/pages/TenderListCompleted'
import Searchtarif from './components/pages/Searchtarif'

// Setting
import Setting from './components/admin/setting/Setting'

// NotFound
import NotFound from './components/NotFound/NotFound'
const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	linkActiveClass: 'active',
	routes: [
		// public components
		{
			path:'/crm',
			name:'crm',
			redirect:'/crm/dashboard',
			meta:{
				requiredAuth:true
			},
			component:Admin,
			children:[
				{
					path:'dashboard',
					component:Dashboard,
					meta:{
						action:'index',
						subject:'DashboardController'
					}
				},
				{
					path:'profile',
					component:Profile,
					meta:{
						action:'profile',
						subject:'UserController'
					}
				},
				{
					path:'employee',
					component:Employee,
					meta:{
						action:'index',
						subject:'EmployeeController'
					}
				},
				{
					path:'employee/add',
					component:AddEmployee,
					meta:{
						action:'store',
						subject:'EmployeeController'
					}
				},
				{
					path:'employee/edit/:employeeId',
					component:EditEmployee,
					meta:{
						action:'edit',
						subject:'EmployeeController'
					}
				},
				{
					path:'role',
					component:Role,
					meta:{
						action:'index',
						subject:'RoleController'
					}
				},
				{
					path:'role/add',
					component:AddRole,
					meta:{
						action:'store',
						subject:'RoleController'
					}
				},
				{
					path:'role/edit/:roleId',
					component:EditRole,
					meta:{
						action:'edit',
						subject:'RoleController'
					}
				},
				{
					path:'role/:roleId',
					component:Permission,
					meta:{
						action:'index',
						subject:'PermissionController'
					}
				},
				{
					path:'position',
					component:Position,
					meta:{
						action:'index',
						subject:'PositionController'
					}
				},
				{
					path:'position/add',
					component:AddPosition,
					meta:{
						action:'store',
						subject:'PositionController'
					}
				},
				{
					path:'position/edit/:positionId',
					component:EditPosition,
					meta:{
						action:'edit',
						subject:'PositionController'
					}
				},
				{
					path:'client',
					component:Client,
					meta:{
						action:'carrier',
						subject:'UserController'
					}
				},
				{
					path:'client/add',
					component:AddClient,
				},
				{
					path:'client/edit/:clientId',
					component:EditClient,
					meta:{
						action:'carrierEdit',
						subject:'UserController'
					}
				},
				{
					path:'conts',
					component:Conts,
					meta:{
						action:'index',
						subject:'ContsController'
					}
				},
				{
					path:'conts/add',
					component:AddConts,
					meta:{
						action:'store',
						subject:'ContsController'
					}
				},
				{
					path:'conts/edit/:contId',
					component:EditConts,
					meta:{
						action:'edit',
						subject:'ContsController'
					}
				},
				{
					path:'action',
					component:Action,
					meta:{
						action:'index',
						subject:'ActionController'
					}
				},
				{
					path:'action/add',
					component:AddAction,
					meta:{
						action:'store',
						subject:'ActionController'
					}
				},
				{
					path:'action/edit/:actionId',
					component:EditAction,
					meta:{
						action:'edit',
						subject:'ActionController'
					}
				},
				{
					path:'region',
					component:Region,
					meta:{
						action:'index',
						subject:'RegionController'
					}
				},
				{
					path:'region/add',
					component:AddRegion,
					meta:{
						action:'store',
						subject:'RegionController'
					}
				},
				{
					path:'region/edit/:regionId',
					component:EditRegion,
					meta:{
						action:'edit',
						subject:'RegionController'
					}
				},
				{
					path:'area',
					component:Area,
					meta:{
						action:'index',
						subject:'AreaController'
					}
				},
				{
					path:'area/add',
					component:AddArea,
					meta:{
						action:'store',
						subject:'AreaController'
					}
				},
				{
					path:'area/edit/:areaId',
					component:EditArea,
					meta:{
						action:'edit',
						subject:'AreaController'
					}
				},
				{
					path:'setting',
					component:Setting,
				},
			]
		},
		{
			path:'/',
			name:'login',
			components:{
				default:Login,
			},
			// children:[
			// 	{
			// 		path:'/',
			// 		name:'home',
			// 		components:{
			// 			default:Home,
			// 		},
			// 	},
			// 	{
			// 		path:'/login',
			// 		name:'login',
			// 		components:{
			// 			default:Login,
			// 		},
			// 	},
			// 	{
			// 		path:'/register',
			// 		name:'register',
			// 		components:{
			// 			default:Register,
			// 		},
			// 	},
			// 	{
			// 		path:'/forgot',
			// 		name:'forgot',
			// 		components:{
			// 			default:Forgot,
			// 		},
			// 	},
			// 	{
			// 		path:'/contact',
			// 		name:'contact',
			// 		components:{
			// 			default:Contact,
			// 		},
			// 	},
			// 	{
			// 		path:'/about',
			// 		name:'about',
			// 		components:{
			// 			default:About,
			// 		},
			// 	},
			// ]
		},
		{
			path:'*',
			name:'notfound',
			components:{
				default:NotFound,
			},
		}
	]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiredAuth)) {
  	const loggedIn = TokenService.getToken();
    if (!loggedIn || loggedIn == 'undefined'){
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
    	if (TokenService.getCurrentUser().role.name != 'admin'){
		 	const checkPerm = to.matched.some(route => {
			    return ability.can(route.meta.action, route.meta.subject)
		  	})
		  	if (!checkPerm) {
			    return next('/notfound')
		  	}
    	}
      	next()
    }
  } else {
    next()
  }
})

export default router;
