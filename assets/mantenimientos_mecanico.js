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
            horas: null

        };
    },
    methods: {
        clic() {
            this.selec = this.selected === null ? false : true

        },
        asignar_mantenimiento() {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, "0");
            var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
            var yyyy = today.getFullYear();
            today = mm + "/" + dd + "/" + yyyy;
            let val = this.value.toString()
            let documento = JSON.parse(localStorage.getItem("Usuario")).documento
            axios.put(config.url_api + "/usuario/registar-mantenimiento/" + documento + "/" + this.selected.placa, {

                fecha: today,
                trabajos_realizados: val,
                horas_invertidas: this.horas

            }).then(res => {
                console.log(res);

                let pos = -1
                this.drop.forEach((x, i) => {
                    if (x.value)
                        if (x.value.placa === this.selected.placa) {
                            pos = i
                            return
                        }
                })
                this.limpiar_campos()
                this.drop.splice(pos, 1)
            }).catch(err => {
                console.log(err);

            })

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

        }

    }
}