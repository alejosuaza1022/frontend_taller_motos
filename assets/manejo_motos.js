//chevron-bar-down
import {
    BIcon,
    BIconChevronDoubleUp,
    BIconChevronDoubleDown,
    BIconPersonPlus,
    BIconTrash,
    BIconPersonLinesFill,
    BIconPencilSquare
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
        BIconPencilSquare
    },
    beforeMount() {
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
                vencimiento_soat: "07/20/2020",
                nro_tecnomecanica: "",
                vencimiento_tecnomecanica: "07/20/2020"
            },
            crear: true,
            tabla: true,
            lista_tabla: [],
            fields: [
                "placa",
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
                { key: "nro_tecnomecanica", value: "Tecnomecanica" },
                {
                    key: "acciones",
                    class: "center"
                }
            ]
        };
    },
    methods: {
        crear_moto() {
            let aux = Object.assign({}, this.moto)
            aux.vencimiento_soat = moment(this.moto.vencimiento_soat).format("MM/DD/YYYY")
            aux.vencimiento_tecnomecanica = moment(this.moto.vencimiento_tecnomecanica).format("MM/DD/YYYY")
            if (this.crear) {
                aux.estado = "espera"
                axios.post(config.url_api + "/motos", aux).then(res => {
                    console.log(res);
                    this.limpiar_campos()
                    this.lista_tabla.push(this.moto)

                }).catch(err => {
                    console.log(err)
                })
                return
            }
            axios.put(config.url_api + "/motos/" + this.moto.placa, this.moto).then(res => {
                this.crear = true;
                let aux1 = []
                aux1 = Object.assign([], this.lista_tabla)
                this.lista_tabla = aux1.map(x => {
                    if (x.placa === this.moto.placa)
                        x = Object.assign({}, this.moto)

                    return x;
                })
                this.limpiar_campos()
            }).catch(err => {
                console.log(err)
            })

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
        },
        mostrar_tabla() {
            console.log(this.lista_tabla)
            this.tabla = false;
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

        }

    }
}