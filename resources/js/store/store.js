import Vue from 'vue'
import Vuex from 'vuex'

// ability
import storage from "./storage"
import {abilityPlugin, ability as appAbility} from './ability'
import router from "./../routes"

// user service
import {UserService} from "../services/user.service";
// modules
import {user} from "./user.module"
import {role} from "./role.module"
import {position} from "./position.module"
import {employee} from "./employee.module"
import {conts} from "./conts.module"
import {action} from "./action.module"
import {permission} from "./permission.module"
import {dashboard} from "./dashboard.module"
import {region} from "./region.module"
import {area} from "./area.module"
import {station} from "./station.module"
import {passport} from "./passport.module"
import {passportTab} from "./passportTab.module"
import {direction} from "./direction.module"
import {typeofdirection} from "./typeofdirection.module"
import {typeofbus} from "./typeofbus.module"
import {busclass} from "./busclass.module"
import {client} from "./client.module"
import {complaint} from "./complaint.module"
import {busmodel} from "./busmodel.module"
import {busbrand} from "./busbrand.module"
import {application} from "./application.module"
import {conditionalsign} from "./conditionalsign.module"
import {tenderannounce} from "./tenderannounce.module"
import {confirmtender} from "./confirmtender.module"
import {completedtender} from "./completedtender.module"
import {checkcontrol} from "./checkcontrol.module"
import {payment} from "./payment.module"
import {find} from "./find.module"
import {apply} from "./apply.module"
import {protocol} from "./protocol.module"
import { tarifannounce } from "./tarifannounce.module"
import { tarifcity } from "./tarifcity.module"
import { confirmtitul } from "./confirmtitul.module"
import { confirmtiming } from "./confirmtiming.module"
import { confirmscheme } from "./confirmscheme.module"
import { confirmschedule } from "./confirmschedule.module"
import { page } from "./page.module"
import { contract } from "./contract.module"
import { setting } from "./setting.module"
import { confirmdemand } from "./confirmdemand.module"
import { oldprotocol } from "./oldprotocol.module"
import { oldcontract } from "./oldcontract.module"

import { TokenService } from './../services/storage.service'

Vue.use(Vuex)
export const ability = appAbility

const store = new Vuex.Store(
	{
		plugins:[
			storage({
				storedKeys:['token','rules'],
				destroyOn:['logoutSuccess']
			}),
			abilityPlugin
		],
		modules:{
			user,
			role,
			position,
			employee,
			conts,
			action,
			permission,
			dashboard,
			region,
			passport,
			passportTab,
			area,
			direction,
			station,
			typeofdirection,
			typeofbus,
			busclass,
			client,
			complaint,
            busmodel,
            busbrand,
			application,
			conditionalsign,
			tenderannounce,
			payment,
			find,
            confirmtender,
            completedtender,
            checkcontrol,
            protocol,
            apply,
            tarifannounce,
            tarifcity,
            confirmtitul,
            confirmtiming,
            confirmschedule,
            confirmscheme,
            page,
            contract,
            setting,
            confirmdemand,
            oldprotocol,
            oldcontract,
		},
		state:{
			rules:[],
			userInfo:[],
			token:'',
			authenticationErrorCode: false,
			authenticationError: '',
			registerError: '',
			authenticating: false,
			registerErrorCode: false,
		},
		getters:{
			getUser(state){
				return state.userInfo
			},
			authenticationErrorCode(state){
				return state.authenticationErrorCode
			},

			authenticationError(state){
				return state.authenticationError
			},
			getRegisterError(state){
				return state.registerError
			},
			authenticating(state){
				return state.authenticating
			}
		},
		mutations:{
			loginRequest(state){
				state.authenticating = true;
				state.authenticationError = '';
				state.authenticationErrorCode = false
			},
			logoutSuccess(state){
				state.token = '';
				state.rules = [];
			},
			loginSuccess(state,user){
				TokenService.saveCurrentUser(user.result.user);
				state.token = user.token;
				state.authenticationErrorCode = false
				state.userInfo = user.result.user;
				state.rules = user.result.permissions;
			},
			loginError(state,user){
				state.authenticating = false
				state.authenticationErrorCode = user.data.error
				state.authenticationError = user.data.message
			},
			setRegisterError(state,user){
				state.registerError = user.data
			}
		},
		actions:{
			async login({ commit,dispatch }, userData){
				try{
					const user = await UserService.login(userData);
					if(user.data.error === true){
						await commit('loginError', user);
					}else{
						await dispatch('profileUser');
						// let routeHistory = router.history.current.query.redirect
						// router.push(routeHistory && routeHistory != '/' ? routeHistory : '/')
					}
				}catch(e){}
			},
			async profileUser({commit}){
				try{
					const userInfo = await UserService.profileUser();
					await commit('loginSuccess', userInfo.data);
					return true
				}catch(e){
					return false
				}
			},
			// register
			async register({ commit,dispatch }, payload){
				try{
					const newUser = await UserService.register(payload);
					await commit('setRegisterError', newUser);
				}catch(e){}
			},
			logout({ commit }){
				UserService.logout();
				commit('logoutSuccess');
				router.push('/');
			},
		}
	}
)

export default store;
