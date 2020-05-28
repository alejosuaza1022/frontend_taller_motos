//chevron-bar-down
import {
    BIcon,
    BIconChevronDoubleUp,
    BIconChevronDoubleDown,
    BIconPersonPlus,
    BIconTrash,
    BIconPersonLinesFill,
    BIconPencilSquare,
    BIconClipboardData,
    BIconEyeFill,
    BIconExclamation
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
        BIconClipboardData,
        BIconEyeFill,
        BIconExclamation
    },
    beforeMount() {
        axios.get(config.url_api + "/usuario").then(res => {
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
            message: '',
            model_header_color: '',
            model_tbody_color: '',
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
            bandera_eliminar: false,
            bandera: false,
            item_eliminar: null,
            crear: true,
            tabla: true,
            lista_tabla: [],
            fields: [{
                    key: "documento",
                    value: "Documento",
                    stickyColumn: true,
                    isRowHeader: true,
                    variant: 'primary'
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
            valor_hora: null,
            id_usuario: null,
            lista_id: [],
            password: "password",
            scale: 1.5,
            colorOk: ''
        };
    },
    methods: {
        crear_usuario() {
            this.model_header_color = "primary";
            this.model_tbody_color = "dark";
            if (this.crear) {
                this.message = " ¿Seguro que desea crear el usuario con esos datos? "
                this.$bvModal.show("modal-2");
                return
            }
            this.message = " ¿Seguro que desea actualizar el usuario con esos datos? "
            this.$bvModal.show("modal-2");
        },
        abrir_modal({
            item
        }) {
            this.id_usuario = item.documento
            this.lista_tabla.forEach(x => {
                var o = Object.assign({}, x)
                this.lista_id.push({
                    text: o.documento,
                    value: o.documento
                })
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
            let aux = {
                fechaini: fechai,
                fechafin: fechaf
            }
            axios.post(config.url_api + "/usuario/horas-laboradas/" + this.id_usuario, aux).then(res => {
                this.bandera = true;
                if (res.data.data.length > 0)
                    this.valor_hora = res.data.data[0].sum
                else
                    this.valor_hora = 0

            }).catch(err => {
                this.setear_error()
                this.message = err.response.data.message
                this.$bvModal.show("modal-3");

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
            this.item_eliminar = item
            this.bandera_eliminar = true
            this.model_header_color = "primary";
            this.model_tbody_color = "dark";
            this.message = " ¿Seguro que desea eliminar el usuario? "
            this.$bvModal.show("modal-2");

        },
        mostrar() {
            this.password = "text";
            this.scale = 1.7
        },
        esconder() {
            this.password = "password";
            this.scale = 1.5

        },
        aceptar() {
            this.cancelar()
            if (this.bandera_eliminar) {
                axios.delete(config.url_api + "/usuario/" + this.item_eliminar.documento).then(res => {
                    this.crear = true;
                    let pos = this.lista_tabla.indexOf(this.item_eliminar)
                    this.lista_tabla.splice(pos, 1)
                    this.setear_exito()
                    this.message = " Se eliminó correctamente "
                    this.$bvModal.show("modal-3");

                    this.limpiar_campos()
                }).catch(err => {
                    console.log(err.response);
                    this.setear_error()
                    this.message = err.response.data.message
                    this.$bvModal.show("modal-3");
                    this.limpiar_campos()
                        //this.message = err.message
                })
                this.bandera_eliminar = false
                return
            } else if (this.crear) {
                axios.post(config.url_api + "/usuario", this.usuario).then(res => {
                    var o = Object.assign({}, this.usuario)
                    o.acciones = null
                    this.lista_tabla.push(o)
                    this.setear_exito()
                    this.message = " Se creó correctamente "
                    this.$bvModal.show("modal-3");
                    this.limpiar_campos()

                }).catch(err => {
                    this.setear_error()
                    this.message = err.response.data.message
                    this.$bvModal.show("modal-3");
                    this.limpiar_campos()
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
                this.setear_exito()
                this.message = " Se actualizó correctamente "
                this.$bvModal.show("modal-3");
                this.limpiar_campos()
            }).catch(err => {
                this.setear_error()
                this.message = err.response.data.message
                this.$bvModal.show("modal-3");
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
        },
        close() {
            this.$bvModal.hide("modal-1");
            this.bandera = false
        }


    }
}