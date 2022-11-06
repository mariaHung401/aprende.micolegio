const INITIAL_STATE = {
    alumno: {},
    foto:require("assets/img/default-avatar.png"),
    tareas:[],
    datos:[],
    enviadas:[],
    as3:null,
    ss3:null,
    Grado: [
        { label: "Maternal", value:"A11-0" },
        { label: "Sala de 3", value:"A11-1" },
        { label: "Sala de 4", value:"A11-2" },
        { label: "Sala de 5", value:"A11-3" },
        { label: "1er grado", value:"B11-1" },
        { label: "2do grado", value:"B11-2" },
        { label: "3er grado", value:"B11-3" },
        { label: "4to grado", value:"B11-4" },
        { label: "5to grado", value:"B11-5" },
        { label: "6to grado", value:"B11-6" },
        { label: "1er año", value:"B11-7" },
        { label: "2do año", value:"B11-8" },
        { label: "3er año", value:"B11-9" },
        { label: "4to año", value:"D18-1" },
        { label: "5to año", value:"D18-2" },

        { label: "Mercadeo 4to año", value:"F11-1" },
        { label: "Mercadeo 5to año", value:"F11-2" },
        { label: "Mercadeo 6to año", value:"F11-3" },

        { label: "Adm Financiera A 4to año", value:"C11-1" },
        { label: "Adm Financiera A 5to año", value:"C11-2" },
        { label: "Adm Financiera A 6to año", value:"C11-3" },

        { label: "Adm Financiera B 4to año", value:"E11-1" },
        { label: "Adm Financiera B 5to año", value:"E11-2" },
        { label: "Adm Financiera B 6to año", value:"E11-3" },
    ],
    Seccion: [
        { value: "A", label:"A" },
        { value: "B", label:"B" },
        { value: "C", label:"C" },
        { value: "D", label:"D" },
        { value: "E", label:"E" },
        { value: "F", label:"F" },
        { value: "U", label:"U" },
        { value: "M", label:"M" },
    ],
    Prescolar: [
        { value: "1", label:"Formacion Personal, Social y Comunicacion", key:"A11-0" },
        { value: "2", label:"Relacion con otros Componentes del Ambiente" },
        { value: "3", label:"Ingles" },
        { value: "4", label:"Folklore" },
        { value: "5", label:"Musica" },
        { value: "6", label:"Computacion" },
        { value: "7", label:"Religion" },
        { value: "8", label:"Idiomas" },
        { value: "9", label:"Danzas" },
        { value: "10", label:"Deportes" },
        { value: "11", label:"Integrada" },
    ],
    Primaria: [
        { value: "1", label:"Lengua y Literatura", key:"B11-1" },
        { value: "2", label:"Matematica" },
        { value: "3", label:"Ciencias Naturales" },
        { value: "4", label:"Ciencias Sociales" },
        { value: "5", label:"Educacion Estetica" },
        { value: "6", label:"Deportes" },
        { value: "7", label:"Ingles" },
        { value: "8", label:"Folklore" },
        { value: "9", label:"Musica" },
        { value: "10", label:"Valores" },
        { value: "11", label:"Computacion" },
        { value: "12", label:"Religion" },
        { value: "13", label:"Idiomas" },
        { value: "14", label:"Danzas" },
        { value: "15", label:"Integrada" },
        { value: "16", label:"Especialidades" },

    ],
    Secundaria: [
        { value: "1", label:"Castellano", key:"100000" },
        { value: "2", label:"Ingles", key:"0" },
        { value: "3", label:"Matematicas", key:"200000"  },
        { value: "4", label:"Deportes", key:"0"  },
        { value: "5", label:"Arte y Patrimonio", key:"300000"  },
        { value: "6", label:"Ciencias Naturales", key:"400000"  },
        { value: "7", label:"Geog Hist Ciudadania", key:"500000"  },
        { value: "8", label:"Orientacion", key:"0"  },
        { value: "9", label:"Grupos CRP", key:"0"  },
        { value: "10", label:"Fisica", key:"0"  },
        { value: "11", label:"Quimica", key:"0"  },
        { value: "12", label:"Biologia", key:"0"  },
        { value: "13", label:"Soberania Nacional", key:"0"  },
        { value: "14", label:"Ciencias de la Tierra", key:"0"  },
        { value: "15", label:"Valores", key:"0"  },
        { value: "16", label:"Computacion", key:"0"  },
        { value: "17", label:"Religion", key:"0"  },
        { value: "18", label:"Oratoria", key:"0"  },
        { value: "19", label:"Panaderia", key:"0"  },
        { value: "20", label:"Primeros Auxilios", key:"0"  },
        { value: "21", label:"Danzas", key:"0"  },
        { value: "22", label:"Contabilidad", key:"0"  },
        { value: "23", label:"Informatica", key:"0"  },
        { value: "24", label:"Serv Adm Merc", key:"0"  },
        { value: "25", label:"Historia de Venezuela", key:"0"  },
        { value: "26", label:"Premilitar", key:"0"  },
        { value: "27", label:"Nociones del Derecho", key:"0"  },
        { value: "28", label:"Turismo", key:"0"  },
        { value: "29", label:"Teoria del Seguro", key:"0"  },
        { value: "30", label:"Seminario", key:"0"  },
        { value: "31", label:"PGCRP", key:"0"  },
        { value: "32", label:"Practica de Oficina", key:"0"  },
        { value: "33", label:"Legislacion Lab Mer", key:"0"  },
        { value: "34", label:"Mencion", key:"0"  },
        { value: "35", label:"Metodologia", key:"0"  },
        { value: "36", label:"Administracion de Nomina", key:"0"  },
        { value: "37", label:"Pasantias", key:"0"  },
        { value: "38", label:"Presupuesto Empresarial", key:"0"  },
        { value: "39", label:"Proyecto", key:"0"  },
        { value: "40", label:"Mercadeo", key:"0"  },
        { value: "41", label:"Mecanografia", key:"0"  },
        { value: "42", label:"Adm Cont", key:"0"  },
        { value: "43", label:"Bancaria", key:"0"  },
        { value: "44", label:"Comercio", key:"0"  },
        { value: "45", label:"Psicologia", key:"0"  },
        { value: "46", label:"Credito y Cobranza", key:"0"  },
        { value: "0", label:"-", key:"0"  },
    ],
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ver_credenciales':
            return {
                ...state,
                as3:action.payload[0],
                ss3:action.payload[1]
            };
        case 'set_alumno':
            let foto=require("assets/img/default-avatar.png");
            let datos={};
            if(action.payload[1][0]!==undefined){
                foto=action.payload[1][0].direccion
            }
            if( action.payload[2][0]!==undefined){
                datos=action.payload[2][0]
            }
            return {
                ...state,
                alumno: action.payload[0][0],
                foto: foto,
                datos:datos,
            };
        case 'ver_tareas':
            return {
                ...state,
                tareas: action.payload[0],
                enviadas: action.payload[1],
            };
        case 'get_alumno':
            return {
                ...state,
            };
        case 'set_foto':
            return {
                ...state,
                foto:action.payload,
            };
        case 'set_datos':
            return {
                ...state,
                datos:action.payload,
            };
        default: return state;
    };
}