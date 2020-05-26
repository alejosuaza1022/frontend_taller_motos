import { BIcon, BIconPersonCircle, BIconPersonFill, BIconForwardFill } from "bootstrap-vue";
import config from "./config"
import axios from "axios"
export default {
    components: {
        BIcon,
        BIconPersonCircle,
        BIconPersonFill,
        BIconForwardFill
    },
    data() {
        return {
            message: '',
            model_header_color: '',
            model_tbody_color: '',
            usuario: {
                id: '',
                clave: ''
            }
        };
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

                    /*  this.model_header_color = "danger";
                      this.model_tbody_color = "danger  ";
                      this.message = 'Claves y/o usuario erroneos'*/
                    this.$bvModal.show("modal-1");
                    this.message = err.message

                });


        },
        agregarInfoLS(item) {
            localStorage.setItem('Usuario', JSON.stringify(item));
        },
    }
}