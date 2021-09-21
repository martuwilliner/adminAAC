const dashboard = {
    data() {
        return {
            email:'',
            password: '',
            search: '',
            user: null,
            logged: false,
            filtred: false,
            opened: false,
            participantes: []      
        }
    },
    watch: {
        logged(data,old){
            if(data == true){
                this.getAllRegistred()
            }
        }
    },
    methods: {
        getUser :async function  (){
            const server = "https://aac.raxar.com.ar";
            const endpoint = `${server}/api/users/index`;
            const settings = {
                method: 'GET',
                headers: new Headers ({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDMxYzY0NGRmNDI3YTdjYTI5ZTE1YjZhNjE3ODgxNTdkYTJkOTRhMzJiMzM1ZWJmMjAxYjRhNWYxM2Y3YzZiZTJlNGFiZDNhYTdkZjdlZDMiLCJpYXQiOjE2MzE3MTU0NjcuNTQ4MTY5LCJuYmYiOjE2MzE3MTU0NjcuNTQ4MTczLCJleHAiOjE2NjMyNTE0NjcuNTQyNzA3LCJzdWIiOiI3Iiwic2NvcGVzIjpbXX0.Ihp1nORdcI7ftvjIdinqJD1_LUkQ68_9QcPVfvlSsPoGJMIKCqO774DgF2IGpbLq38gNfLk2lzG0nwb7jvnRr0iC7n0y0TTRodFqOuhdnvcA7v5Fte3U4461Lc9-OCCnYMO0_mhIOGvyiZ8FuS7KJXppyW4z4SFz44J4UGDuH93sK9r53oxCGkqAR5GH9_Rs6ZsLait1iRoBpMp5HKXI7jCFFQUnfyO0QjSW2-eTq5rtrQhRkVaavuNvDKOyH2lFxRzhJf83CljgvtcRvhPk-buAe5_5v0Y50TXiEHL47lWuxNpTOWmcnUihadRGCF206NYjCO9zYGaUrULO-DQgncthz5oEUvMecGHJOkLkonTkzxwzUS5YjpbIBUJid1dUev9kK9r008SA1DU60mLMXGCs3ReyRfTgFg9coHYgptxxflNbSELT6td3nmGobzw7ugYicYQncqeMVmRjiDLaoSKOmQt5AgcA7oy1brQhu8ev_RcRtmAdvvW1pg_r1YBg5TZNi3eXnTE9CNdQTk87hYUj4qo1hcfvuYRjPyOLdJjGZZjhMNShsDPTmgPXdJo5585BCEVMPE1BZExGcqsSZhP654w1Oi-fD_Em7pjmv3Ln4Z9v9EKWLtp-KWdLANzJN-sxB6Gs9UuEEeeqWtmpoNVMl5JYbQNarEYa4Ljdioo'
                })
            }
            try{
                const request = await fetch(endpoint,settings);
                const data = await request.json();
                const admins = data.filter(user => user.is_admin == 1);
                const search = admins.find(user => user.email == this.email ); // && user.password == this.password HAY QUE AGREGAR SI O SI
                if(search){
                    this.logged = true
                }
            }catch (error) {
                console.clear();
                console.error(error)
            } 
        },
        logout: function () {
            this.logged = !this.logged
        },
        searchByEmail: function () {
            if(this.email.length > 2){
                this.participantes = this.participantes.filter(p => p.email.indexOf(this.search) > -1)
                console.clear();
                console.log(this.search)
                console.log(this.participantes)
                this.filtred = true;
            }else{
                this.getAllRegistred()
            }
        },
        searchByEnabled: function () {
            this.participantes = this.participantes.filter(p => p.status == 'enabled')
            this.filtred = true;
        },
        popUp: async function (e) {
            const target = e.target;
            const server = "https://aac.raxar.com.ar"; 
            const endpoint = `${server}/api/users/index`;
            const settings = {
                method: 'GET',
                headers: new Headers ({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDMxYzY0NGRmNDI3YTdjYTI5ZTE1YjZhNjE3ODgxNTdkYTJkOTRhMzJiMzM1ZWJmMjAxYjRhNWYxM2Y3YzZiZTJlNGFiZDNhYTdkZjdlZDMiLCJpYXQiOjE2MzE3MTU0NjcuNTQ4MTY5LCJuYmYiOjE2MzE3MTU0NjcuNTQ4MTczLCJleHAiOjE2NjMyNTE0NjcuNTQyNzA3LCJzdWIiOiI3Iiwic2NvcGVzIjpbXX0.Ihp1nORdcI7ftvjIdinqJD1_LUkQ68_9QcPVfvlSsPoGJMIKCqO774DgF2IGpbLq38gNfLk2lzG0nwb7jvnRr0iC7n0y0TTRodFqOuhdnvcA7v5Fte3U4461Lc9-OCCnYMO0_mhIOGvyiZ8FuS7KJXppyW4z4SFz44J4UGDuH93sK9r53oxCGkqAR5GH9_Rs6ZsLait1iRoBpMp5HKXI7jCFFQUnfyO0QjSW2-eTq5rtrQhRkVaavuNvDKOyH2lFxRzhJf83CljgvtcRvhPk-buAe5_5v0Y50TXiEHL47lWuxNpTOWmcnUihadRGCF206NYjCO9zYGaUrULO-DQgncthz5oEUvMecGHJOkLkonTkzxwzUS5YjpbIBUJid1dUev9kK9r008SA1DU60mLMXGCs3ReyRfTgFg9coHYgptxxflNbSELT6td3nmGobzw7ugYicYQncqeMVmRjiDLaoSKOmQt5AgcA7oy1brQhu8ev_RcRtmAdvvW1pg_r1YBg5TZNi3eXnTE9CNdQTk87hYUj4qo1hcfvuYRjPyOLdJjGZZjhMNShsDPTmgPXdJo5585BCEVMPE1BZExGcqsSZhP654w1Oi-fD_Em7pjmv3Ln4Z9v9EKWLtp-KWdLANzJN-sxB6Gs9UuEEeeqWtmpoNVMl5JYbQNarEYa4Ljdioo'
                })
            }
            try {
                const request = await fetch(endpoint,settings);
                const data = await request.json();
                const email = target.dataset.user;
                const user = data.find(user => user.email == email);
                this.user = user;
                this.opened = true;
            } catch (error) {
                console.clear();
                console.error(error)
            }

        },

        popUpClose: function (e) {
            this.user = null;
            this.opened = false;
            this.getAllRegistred();
        },
      getAllRegistred:async function  () {
        const server = "https://aac.raxar.com.ar"; 
        const endpoint = `${server}/api/users/index`;
        const settings = {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDMxYzY0NGRmNDI3YTdjYTI5ZTE1YjZhNjE3ODgxNTdkYTJkOTRhMzJiMzM1ZWJmMjAxYjRhNWYxM2Y3YzZiZTJlNGFiZDNhYTdkZjdlZDMiLCJpYXQiOjE2MzE3MTU0NjcuNTQ4MTY5LCJuYmYiOjE2MzE3MTU0NjcuNTQ4MTczLCJleHAiOjE2NjMyNTE0NjcuNTQyNzA3LCJzdWIiOiI3Iiwic2NvcGVzIjpbXX0.Ihp1nORdcI7ftvjIdinqJD1_LUkQ68_9QcPVfvlSsPoGJMIKCqO774DgF2IGpbLq38gNfLk2lzG0nwb7jvnRr0iC7n0y0TTRodFqOuhdnvcA7v5Fte3U4461Lc9-OCCnYMO0_mhIOGvyiZ8FuS7KJXppyW4z4SFz44J4UGDuH93sK9r53oxCGkqAR5GH9_Rs6ZsLait1iRoBpMp5HKXI7jCFFQUnfyO0QjSW2-eTq5rtrQhRkVaavuNvDKOyH2lFxRzhJf83CljgvtcRvhPk-buAe5_5v0Y50TXiEHL47lWuxNpTOWmcnUihadRGCF206NYjCO9zYGaUrULO-DQgncthz5oEUvMecGHJOkLkonTkzxwzUS5YjpbIBUJid1dUev9kK9r008SA1DU60mLMXGCs3ReyRfTgFg9coHYgptxxflNbSELT6td3nmGobzw7ugYicYQncqeMVmRjiDLaoSKOmQt5AgcA7oy1brQhu8ev_RcRtmAdvvW1pg_r1YBg5TZNi3eXnTE9CNdQTk87hYUj4qo1hcfvuYRjPyOLdJjGZZjhMNShsDPTmgPXdJo5585BCEVMPE1BZExGcqsSZhP654w1Oi-fD_Em7pjmv3Ln4Z9v9EKWLtp-KWdLANzJN-sxB6Gs9UuEEeeqWtmpoNVMl5JYbQNarEYa4Ljdioo'
            })
        }
        try {
            const request = await fetch(endpoint,settings);
            const data = await request.json();
            const users = data.filter(user => user.is_admin != 1);
            this.participantes = users;
            this.filtred = false;
        } catch (error) {
            console.clear();
            console.error(error)
        } 
      },
      enabledUser:async function(){
        const server = "https://aac.raxar.com.ar"; 
        const endpoint = `${server}/api/users/change-status/${this.user.id}/${this.user.status == "enabled" ? "disabled" : "enabled" }`;
        const settings = {
            method: 'PUT',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDMxYzY0NGRmNDI3YTdjYTI5ZTE1YjZhNjE3ODgxNTdkYTJkOTRhMzJiMzM1ZWJmMjAxYjRhNWYxM2Y3YzZiZTJlNGFiZDNhYTdkZjdlZDMiLCJpYXQiOjE2MzE3MTU0NjcuNTQ4MTY5LCJuYmYiOjE2MzE3MTU0NjcuNTQ4MTczLCJleHAiOjE2NjMyNTE0NjcuNTQyNzA3LCJzdWIiOiI3Iiwic2NvcGVzIjpbXX0.Ihp1nORdcI7ftvjIdinqJD1_LUkQ68_9QcPVfvlSsPoGJMIKCqO774DgF2IGpbLq38gNfLk2lzG0nwb7jvnRr0iC7n0y0TTRodFqOuhdnvcA7v5Fte3U4461Lc9-OCCnYMO0_mhIOGvyiZ8FuS7KJXppyW4z4SFz44J4UGDuH93sK9r53oxCGkqAR5GH9_Rs6ZsLait1iRoBpMp5HKXI7jCFFQUnfyO0QjSW2-eTq5rtrQhRkVaavuNvDKOyH2lFxRzhJf83CljgvtcRvhPk-buAe5_5v0Y50TXiEHL47lWuxNpTOWmcnUihadRGCF206NYjCO9zYGaUrULO-DQgncthz5oEUvMecGHJOkLkonTkzxwzUS5YjpbIBUJid1dUev9kK9r008SA1DU60mLMXGCs3ReyRfTgFg9coHYgptxxflNbSELT6td3nmGobzw7ugYicYQncqeMVmRjiDLaoSKOmQt5AgcA7oy1brQhu8ev_RcRtmAdvvW1pg_r1YBg5TZNi3eXnTE9CNdQTk87hYUj4qo1hcfvuYRjPyOLdJjGZZjhMNShsDPTmgPXdJo5585BCEVMPE1BZExGcqsSZhP654w1Oi-fD_Em7pjmv3Ln4Z9v9EKWLtp-KWdLANzJN-sxB6Gs9UuEEeeqWtmpoNVMl5JYbQNarEYa4Ljdioo'
            })
        }
        try {
            const request = await fetch(endpoint,settings);
            const response = await request.json();
            this.popUpClose()
        } catch (error) {
            console.error(error)
        }
      }   
    },
}

Vue.createApp(dashboard).mount('#app')