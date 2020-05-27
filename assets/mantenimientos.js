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
        axios.get(config.url_api + "/usuario/mecanicos").then(res => {
            res.data.usuario.forEach(x => {
                let o = {}
                o.value = x
                o.text = `Id: ${x.documento} -- Nombre: ${x.nombre} -- Apellidos: ${x.apellidos}`
                this.mecanicos.push(o)
            })
            axios.get(config.url_api + "/motos/disponibles").then(res => {
                res.data.usuario.forEach(x => {
                    let o = {}
                    o.value = x
                    o.text = `Placa: ${x.placa} -- Propietario: ${x.id_propietario} -- Marca: ${x.marca}`
                    this.motos.push(o)
                })

            }).catch(err => {
                console.log(err);

            })
        }).catch(err => {
            console.log(err);
        })
        axios.get(config.url_api + "/mantenimientos").then(res => {
            this.lista_tabla = res.data.data.map(x => {
                let o = Object.assign({}, x)
                o.acciones = null
                o.fecha = o.fecha.slice(0, 10)
                return o;
            })

        }).catch(err => {
            console.log(err);

        })


    },
    data() {
        return {
            motos: [{
                value: null,
                text: 'Seleccione una moto'
            }],
            mecanicos: [{
                value: null,
                text: 'Seleccione un mecanico'
            }],
            mantenimiento: {
                mecanico: null,
                moto: null
            },
            crear: true,
            tabla: true,
            lista_tabla: [],

        };
    },
    methods: {
        asignar_mantenimiento() {
            if (this.crear) {
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, "0");
                var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
                var yyyy = today.getFullYear();
                today = mm + "/" + dd + "/" + yyyy;



                axios.post(config.url_api + "/mantenimientos/" + this.mantenimiento.moto.placa + '/' + this.mantenimiento.mecanico.documento, {
                    fecha: today
                }).then(res => {
                    console.log(res);
                    let pos = -1
                    this.motos.forEach((x, i) => {
                        if (x.value)
                            if (x.value.placa === this.mantenimiento.moto.placa)
                                pos = i;
                    })
                    this.mantenimiento.moto = null
                    this.mantenimiento.mecanico = null
                    this.motos.splice(pos, 1)

                }).catch(err => {
                    console.log(err)
                })
                return
            }


        },
        limpiar_campos() {
            this.usuario = {
                documento: "",
                tipo_documento: null,
                nombre: "",
                apellidos: "",
                celular: "",
                correo: "",
                rol: null,
                clave: ""
            }
        },
        mostrar_tabla() {
            console.log(this.lista_tabla)
            this.tabla = false;
        },
        esconder_tabla() {
            this.tabla = true;
        },
        cargar_usuario({
            item
        }) {
            this.crear = false
            this.usuario = Object.assign({}, item)
        },
        eliminar_usuario({
            item
        }) {
            let fecha1 = moment(item.fecha).format("MM/DD/YYYY")
            axios.delete(config.url_api + "/mantenimientos/" + item.placa + '/' + item.id_mecanico, { data: { fecha: fecha1 } }).then(res => {
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