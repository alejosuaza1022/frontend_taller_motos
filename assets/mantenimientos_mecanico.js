//chevron-bar-down
import {
    BIcon,
    BIconChevronDoubleUp,
    BIconChevronDoubleDown,
    BIconPersonPlus,
    BIconTrash,
    BIconPersonLinesFill,
    BIconPencilSquare,
    BIconPlus
} from "bootstrap-vue";
const axios = require("axios")
const config = require("./config")
const moment = require('moment');
export default {
    layout: "usuario",
    components: {
        BIcon,
        BIconChevronDoubleDown,
        BIconChevronDoubleUp,
        BIconPersonPlus,
        BIconTrash,
        BIconPersonLinesFill,
        BIconPencilSquare,
        BIconPlus
    },
    beforeMount() {
        let documento = JSON.parse(localStorage.getItem("Usuario")).documento
        axios.get(config.url_api + "/mantenimientos/" + documento).then(res => {
            res.data.data.forEach(x => {
                let o = {}
                o.fecha = x.fecha.slice(0, 10)
                o.value = x
                o.text = `Placa moto: ${x.placa} -- Fecha asignación: ${o.fecha}`
                this.drop.push(o)
            })

        }).catch(err => {
            console.log(err);
        })


    },
    data() {
        return {
            value: [],
            tag: null,
            hola: null,
            drop: [{
                value: null,
                text: "Seleccione una opción"
            }],

            selected: null,
            mecanicos: [{
                value: null,
                text: 'Seleccione un mecanico'
            }],
            selec: false,
            horas: null,
            model_header_color: "",
            message: '',
            model_tbody_color: "",
            colorOk: "",

        };
    },
    methods: {
        clic() {
            this.selec = this.selected === null ? false : true

        },
        asignar_mantenimiento() {
            console.log(this.value.length);

            if (this.value.length > 0) {
                this.model_header_color = "primary";
                this.model_tbody_color = "dark";
                this.message = " ¿Seguro que desea resgistar esas tareas para esa moto? "
                this.$bvModal.show("modal-2");
                return
            }
            this.setear_error()
            this.message = "ingrese al menos una tarea realizada"
            this.$bvModal.show("modal-1")

        },
        limpiar_campos() {
            this.selected = null
            this.selec = false
            this.value = []
            this.horas = null

        },

        eliminar_usuario({
            item
        }) {

            axios.delete(config.url_api + "/usuario/" + item.documento).then(res => {
                this.crear = true;
                let pos = this.lista_tabla.indexOf(item)

                this.lista_tabla.splice(pos, 1)

                this.limpiar_campos()
            }).catch(err => {
                console.log(err)
            })

        },
        aceptar() {
            this.cancelar()
            let user = JSON.parse(localStorage.getItem("Usuario"))
            if (user) {
                let fecha = moment(this.selected.fecha).format("MM/DD/YYYY")
                let placa = this.selected.placa
                let val = this.value.toString()
                let documento = JSON.parse(localStorage.getItem("Usuario")).documento
                axios.put(config.url_api + "/usuario/registar-mantenimiento/" + documento + "/" + placa, {
                    fecha,
                    trabajos_realizados: val,
                    horas_invertidas: this.horas
                }).then(res => {
                    let pos = -1
                    this.drop.forEach((x, i) => {
                        if (x.value)
                            if (x.value.placa === this.selected.placa) {
                                pos = i
                                return
                            }
                    })
                    this.setear_exito()
                    this.message = " se a registrado el mantenimiento con exito"
                    this.$bvModal.show("modal-1");
                    this.limpiar_campos()
                    this.drop.splice(pos, 1)
                }).catch(err => {
                    this.setear_error()
                    this.message = err.response.data.message
                    this.$bvModal.show("modal-1");
                })
            }
        },
        cancelar() {
            this.$bvModal.hide("modal-2");
        },
        setear_error() {
            this.model_header_color = "danger";
            this.model_tbody_color = "danger";
            this.colorOk = "danger"
        },
        setear_exito() {
            this.model_header_color = "primary";
            this.model_tbody_color = "dark";
            this.colorOk = "primary"
        }

    }
}