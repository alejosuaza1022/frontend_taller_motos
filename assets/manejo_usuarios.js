//chevron-bar-down
import {
    BIcon,
    BIconChevronDoubleUp,
    BIconChevronDoubleDown,
    BIconPersonPlus,
    BIconTrash,
    BIconPersonLinesFill,
    BIconPencilSquare,
    BIconClipboardData
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
        BIconClipboardData
    },
    beforeMount() {
        axios.get(config.url_api + "/usuario").then(res => {
            console.log(res.data.usuario);

            this.lista_tabla = res.data.usuario.map(x => {
                var o = Object.assign({}, x)
                o.acciones = null
                return o;
            })

        }).catch(err => {
            console.log(err);
        })

    },
    data() {
        return {
            valor_tot: false,
            options: [{
                    value: null,
                    text: "Seleccione tipo de documento"
                },

                {
                    value: 'CC',
                    text: "Cédula"
                }, {
                    value: 'CE',
                    text: "Cédula extrangera"
                }, {
                    value: 'NIT',
                    text: "Nit"
                }, {
                    value: 'Pasaporte',
                    text: "pasaporte"
                }
            ],
            fechaini: null,
            fechafin: null,
            roles: [{
                    value: null,
                    text: "Seleccione el rol"
                },

                {
                    value: 1,
                    text: "Mecanico"
                }, {
                    value: 2,
                    text: "Administrador"
                }
            ],
            usuario: {
                documento: "",
                tipo_documento: null,
                nombre: "",
                apellidos: "",
                celular: "",
                correo: "",
                rol: null,
                clave: ""
            },
            crear: true,
            tabla: true,
            lista_tabla: [],
            fields: [{
                    key: "documento",
                    label: "Documento"
                },
                "nombre",
                "apellidos",
                "correo",
                "celular",
                {
                    key: "acciones",
                    class: "center"
                }
            ],
            id_usuario: null,
            lista_id: []
        };
    },
    methods: {
        crear_usuario() {
            if (this.crear) {
                axios.post(config.url_api + "/usuario", this.usuario).then(res => {
                    console.log(res);
                    this.limpiar_campos()

                }).catch(err => {
                    console.log(err)
                })
                return
            }
            axios.put(config.url_api + "/usuario/" + this.usuario.documento, this.usuario).then(res => {
                this.crear = true;
                let aux = []
                aux = Object.assign([], this.lista_tabla)
                this.lista_tabla = aux.map(x => {
                    if (x.documento === this.usuario.documento)
                        x = Object.assign({}, this.usuario)

                    return x;
                })
                this.limpiar_campos()
            }).catch(err => {
                console.log(err)
            })

        },
        abrir_modal({ item }) {
            this.lista_tabla.forEach(x => {
                var o = Object.assign({}, x)
                this.lista_id.push({ text: o.documento, value: o.documento })
            })

            this.$bvModal.show('modal-1')
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
                clave: "",

            }
        },
        cancel() {
            this.crear = true
            this.limpiar_campos()

        },
        calcular_pago() {
            let fechai = moment(this.fechaini).format("MM/DD/YYYY")
            let fechaf = moment(this.fechafin).format("MM/DD/YYYY")
            let aux = { fechaini: fechai, fechafin: fechaf }
            axios.post(config.url_api + "/usuario/horas-laboradas/" + this.id_usuario, aux).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err);

            })
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

            axios.delete(config.url_api + "/usuario/" + item.documento).then(res => {
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