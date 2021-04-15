import ApiService from './api.service'

const ConfirmSchemeSerivce = {
	schemes(){
		return ApiService.get(`/api/sxema`)
	},
	schemeShow(id){
		return ApiService.get(`/api/sxema/edit/${id}`)
	},
	approveScheme(id){
		return ApiService.get(`/api/sxema/approve/${id}`)
	},
	activateScheme(id){
		return ApiService.get(`/api/sxema/activate/${id}`)
	},
	rejectScheme(id){
		return ApiService.get(`/api/sxema/reject/${id}`)
	},
};

export { ConfirmSchemeSerivce };
