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
      ],
    Seccion: [
        { value: "A", label:"A" },
        { value: "B", label:"B" },
        { value: "C", label:"C" },
        { value: "D", label:"D" },
        { value: "E", label:"E" },
        { value: "F", label:"F" },
        { value: "U", label:"U" },
      ],
    Primaria: [
        { value: "1", label:"Lengua y Literatura", key:"B11-1" },
        { value: "2", label:"Matemática" },
        { value: "3", label:"Ciencias Naturales" },
        { value: "4", label:"Ciencias Sociales" },
        { value: "5", label:"Educación Estética" },
        { value: "6", label:"Educación Física y Deportes" },
        { value: "0", label:"*" },
      ],
    Secundaria: [
        { value: "1", label:"Castellano", key:"100000" },
        { value: "2", label:"Inglés y otras Lenguas", key:"0" },
        { value: "3", label:"Matemáticas", key:"200000"  },
        { value: "4", label:"Educación Física", key:"0"  },
        { value: "5", label:"Arte y Patrimonio", key:"300000"  },
        { value: "6", label:"Ciencias Naturales", key:"400000"  },
        { value: "7", label:"Geog-Hist y Ciudadanía", key:"500000"  },
        { value: "8", label:"Orientación y Convivencia", key:"0"  },
        { value: "9", label:"Participación en Grupos CRP", key:"0"  },
        { value: "10", label:"Física", key:"0"  },
        { value: "11", label:"Química", key:"0"  },
        { value: "12", label:"Biología", key:"0"  },
        { value: "13", label:"Form. Soberanía Nacional", key:"0"  },
        { value: "14", label:"Ciencias de la Tierra", key:"0"  },
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