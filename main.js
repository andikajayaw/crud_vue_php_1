var app = new Vue({
	el: '#app',
	data: {
		errorMsg: "",
		successMsg: "",
		showAddModal: false,
		editModal: false,
		deleteModal: false,
		users: [],
		newUser: {name: "", email:"", phone: ""},
		currentUser: {}
	},
	mounted(){
		this.getAllUsers();
	},
	methods: {
		getAllUsers(){
			axios.get("http://crud_vue.test/process.php?action=read")
			.then(function(response){
				if(response.data.error){
					app.errorMsg = response.data.message;
				} else {
					app.users = response.data.users;
				}
			})
		},
		addUser(){
			var formData = app.addFormData(app.newUser);
			axios.post("http://crud_vue.test/process.php?action=create", formData)
			.then(function(response){
				app.newUser = {name: "", email: "", phone: ""};
				if(response.data.error){
					app.errorMsg = response.data.message;
				} else {
					app.successMsg = response.data.message;
					app.getAllUsers();
				}
			})
		},
		updateUser(){
			var formData = app.addFormData(app.currentUser);
			axios.post("http://crud_vue.test/process.php?action=update", formData)
			.then(function(response){
				app.currentUser = {};
				if(response.data.error){
					app.errorMsg = response.data.message;
				} else {
					app.successMsg = response.data.message;
					app.getAllUsers();
				}
			})
		},
		deleteUser(){
			var formData = app.addFormData(app.currentUser);
			axios.post("http://crud_vue.test/process.php?action=delete", formData)
			.then(function(response){
				app.currentUser = {};
				if(response.data.error){
					app.errorMsg = response.data.message;
				} else {
					app.successMsg = response.data.message;
					app.getAllUsers();
				}
			})
		},
		addFormData(obj){
			var fd = new FormData();
			for(var i in obj ){
				fd.append(i, obj[i]);
			}
			return fd;
		},
		selectUser(users){
			app.currentUser = users;
		},
		clearMessage(){
			app.errorMsg = "";
			app.successMsg = "";
		}
	}
})