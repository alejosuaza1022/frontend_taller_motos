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
const moment = require("moment")
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
        var today = new Date();
        this.moto.vencimiento_soat = today;
        this.moto.vencimiento_tecnomecanica = today
        axios.get(config.url_api + "/motos").then(res => {
            this.lista_tabla = res.data.moto.map(x => {
                var o = Object.assign({}, x)
                o.acciones = null
                this.list_fechas.set(o.placa, [o.vencimiento_soat, o.vencimiento_tecnomecanica])
                return o;
            })
        }).catch(err => {
            console.log(err);
        })

    },
    data() {
        return {
            list_fechas: new Map(),
            perPage: 4,
            options: [{
                    value: null,
                    text: "Seleccione estado"
                },

                {
                    value: 'espera',
                    text: "En espera por mantenimiento"
                }, {
                    value: 'mantenimiento',
                    text: "En mantenimiento"
                },
                {
                    value: 'arreglada',
                    text: "Moto lista para salir del taller"
                }
            ],

            moto: {
                placa: "",
                estado: null,
                clase: "",
                marca: "",
                modelo: "",
                color: "",
                cilindraje: "",
                id_propietario: "",
                nro_soat: "",
                vencimiento_soat: null,
                nro_tecnomecanica: "",
                vencimiento_tecnomecanica: null
            },
            crear: true,
            tabla: true,
            lista_tabla: [],
            fields: [{
                    key: "placa",
                    value: "placa",
                    stickyColumn: true,
                    isRowHeader: true,
                    variant: 'primary'
                },
                "estado",
                "marca",
                "modelo",
                "cilindraje", {
                    key: "id_propietario",
                    value: "Propietario"
                },
                {
                    key: "nro_soat",
                    value: "Soat"
                },
                {
                    key: "nro_tecnomecanica",
                    value: "Tecnomecanica"
                },
                {
                    key: "acciones",
                    class: "center"
                }
            ],
            model_header_color: "",
            message: '',
            model_tbody_color: "",
            colorOk: "",
            currentPage: 1,
        };
    },
    computed: {
        rows() {
            return this.lista_tabla.length
        }
    },
    methods: {
        crear_moto() {
            this.model_header_color = "primary";
            this.model_tbody_color = "dark";
            if (this.crear) {
                this.message = " ¿Seguro que desea crear la moto con esos datos? "
                this.$bvModal.show("modal-2");
                return
            }
            this.message = " ¿Seguro que desea actualizar la moto con esos datos? "
            this.$bvModal.show("modal-2");

        },
        cancel() {
            this.crear = true
            this.limpiar_campos()

        },
        limpiar_campos() {

            this.moto = {
                placa: "",
                estado: null,
                clase: "",
                marca: "",
                modelo: "",
                color: "",
                cilindraje: "",
                id_propietario: "",
                nro_soat: "",
                vencimiento_soat: "07/20/2020",
                nro_tecnomecanica: "",
                vencimiento_tecnomecanica: "07/20/2020"
            }
            var today = new Date();
            this.moto.vencimiento_soat = today;
            this.moto.vencimiento_tecnomecanica = today
        },
        mostrar_tabla() {
            if (this.lista_tabla.length > 0) {
                this.tabla = false;
                return
            }
            this.setear_exito()
            this.message = "no hay elementos para mostrar"
            this.$bvModal.show("modal-1");

        },
        esconder_tabla() {
            this.tabla = true;
        },
        cargar_moto({
            item
        }) {
            this.crear = false
            this.moto = Object.assign({}, item)
            this.moto.vencimiento_soat = this.list_fechas.get(this.moto.placa)[0]
            this.moto.vencimiento_tecnomecanica = this.list_fechas.get(this.moto.placa)[1]

        },
        eliminar_moto({
            item
        }) {

            axios.delete(config.url_api + "/moto/" + item.documento).then(res => {
                this.crear = true;
                let pos = this.lista_tabla.indexOf(item)
                this.lista_tabla.splice(pos, 1)
                this.limpiar_campos()
            }).catch(err => {
                console.log(err)
            })

        },
        caracteres() {
            this.moto.placa = this.moto.placa.length > 6 ? this.moto.placa.slice(0, 5) : this.moto.placa;
            let aux = this.moto.placa
            this.moto.placa = aux.toUpperCase()

        },
        caracteres1() {
            this.moto.cilindraje = this.moto.cilindraje.length > 4 ? this.moto.cilindraje.slice(0, 3) : this.moto.cilindraje;

        },
        aceptar() {
            this.cancelar()
            let aux = Object.assign({}, this.moto)
            aux.vencimiento_soat = moment(this.moto.vencimiento_soat).format("MM/DD/YYYY")
            aux.vencimiento_tecnomecanica = moment(this.moto.vencimiento_tecnomecanica).format("MM/DD/YYYY")
            if (this.crear) {
                aux.estado = "espera"
                axios.post(config.url_api + "/motos", aux).then(res => {
                    var o = Object.assign({}, this.moto)
                    o.estado = "espera"
                    o.acciones = null
                    this.lista_tabla.push(o)
                    this.list_fechas.set(o.placa, [o.vencimiento_soat, o.vencimiento_tecnomecanica])
                    this.setear_exito()
                    this.message = " Se creó correctamente "
                    this.$bvModal.show("modal-1");
                    this.limpiar_campos()

                }).catch(err => {
                    this.setear_error()
                    this.message = err.response.data.message
                    this.$bvModal.show("modal-1");
                })
                return
            }
            axios.put(config.url_api + "/motos/" + this.moto.placa, this.moto).then(res => {
                this.crear = true;
                let aux1 = []
                aux1 = Object.assign([], this.lista_tabla)
                this.lista_tabla = aux1.map(x => {
                    if (x.placa === this.moto.placa) {
                        x = Object.assign({}, this.moto)
                        let a = this.list_fechas.get(this.moto.placa)
                        a[0] = this.moto.vencimiento_soat
                        a[1] = this.moto.vencimiento_tecnomecanica

                    }
                    return x;
                })
                this.setear_exito()
                this.message = " Se actualizó correctamente "
                this.$bvModal.show("modal-1");
                this.limpiar_campos()
            }).catch(err => {
                this.setear_error()
                this.message = err.response.data.message
                this.$bvModal.show("modal-1");
                this.limpiar_campos()

            })
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