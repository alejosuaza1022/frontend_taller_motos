import { BIcon, BIconPersonCircle, BIconPersonFill, BIconForwardFill, BIconEyeFill } from "bootstrap-vue";
import config from "./config"
import axios from "axios"
export default {
    components: {
        BIcon,
        BIconPersonCircle,
        BIconPersonFill,
        BIconForwardFill,
        BIconEyeFill
    },
    data() {
        return {
            message: '',
            model_header_color: '',
            model_tbody_color: '',
            model_tfoot_color: '',
            usuario: {
                id: '',
                clave: ''
            },
            password: "password",
            scale: 1.5
        };
    },
    beforeMount() {
        localStorage.clear()
    },
    methods: {
        login() {
            axios.post(config.url_api + "/usuario/login", {
                    documento: this.usuario.id,
                    clave: this.usuario.clave,
                }).then(res => {
                    if (res) {
                        let rol = res.data["rol"]
                        this.agregarInfoLS({
                            documento: this.usuario.id,
                            token: res.data['info'],
                            nombre: res.data['nombre'],
                            rol
                        })

                    }
                    this.$router.push({
                        path: "usuario_principal",
                    });

                })
                .catch(err => {
                    console.log(err.response);
                    this.model_header_color = "danger";
                    this.model_tbody_color = "danger";
                    this.message = err.response.data.message
                    this.model_tfoot_color = "danger"

                    this.$bvModal.show("modal-1");
                    //this.message = err.message

                });


        },
        agregarInfoLS(item) {
            localStorage.setItem('Usuario', JSON.stringify(item));
        },
        mostrar() {
            this.password = "text";
            this.scale = 1.7
        },
        esconder() {
            this.password = "password";
            this.scale = 1.5

        }
    }
}