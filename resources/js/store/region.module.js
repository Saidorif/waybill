import {RegionService} from "../services/region.service";

const state = {
	regions: {},
	regionlist: [],
	message: [],
	region: [],
};

const getters = {
	getRegionList(state){
		return state.regionlist
	},
	getRegions(state){
		return state.regions
	},
	getMassage(state){
		return state.message
	},
	getRegion(state){
		return state.region
	},
};


const actions = {
	async actionRegionList({commit},page){
		try {
			const regions =  await RegionService.regionList(page);
			await commit('setRegionList',regions.data.result)
			return true
		} catch (error) {
			return false
		}
	},
	async actionRegions({commit},page){
		try {
			const regions =  await RegionService.allregions(page);
			await commit('setRegions',regions.data.result)
			return true
		} catch (error) {
			return false
		}
	},
	async actionAddRegion({commit},payload){
		try {
			const regions =  await RegionService.addregion(payload);
			await commit('setMessage',regions.data)
			return true
		} catch (error) {
			return false
		}
	},
	async actionEditRegion({commit},id){
		try {
			const regions =  await RegionService.editregion(id);
			await commit('setEditRegion',regions.data.result)
			return true
		} catch (error) {
			return false
		}
	},
	async actionUpdateRegion({commit},payload){
		try {
			const region =  await RegionService.updateregion(payload);
			await commit('setMessage',region.data)
			return true
		} catch (error) {
			return false
		}
	},
	async actionDeleteRegion({commit},id){
		try {
			const region =  await RegionService.deleteregion(id);
			await commit('setMessage',region.data)
			return true
		} catch (error) {
			return false
		}
	},
};

const mutations = {
	setRegionList(state, regionlist){
		state.regionlist = regionlist
	},
	setRegions(state, regions){
		state.regions = regions
	},
	setMessage(state, message){
		state.message = message
	},
	setEditRegion(state, region){
		state.region = region
	},
};

export const region = {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
