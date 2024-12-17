import {
    Users,
    LayoutGrid,
    MapPin, 
    Calendar,
    Contact
  } from "lucide-react";
  
  import { Workout } from "./Icons";

  type Submenu = {
    href: string;
    label: string;
    active?: boolean;
  };
  
  type Menu = {
    href: string;
    label: string;
    active?: boolean;
    icon: any ;
    submenus?: Submenu[];
  };
  
  type Group = {
    groupLabel: string;
    menus: Menu[];
  };
  
  export function getMenuList(pathname: string): Group[] {
    return [
      {
        groupLabel: "",
        menus: [
          {
            href: "/dashboard",
            label: "Dashboard",
            icon: LayoutGrid,
            submenus: []
          }
        ]
      },
      {
        groupLabel: "Contents",
        menus: [
          {
            href: "",
            label: "Mi centro",
            icon: MapPin ,
            submenus: [
              {
                href: "/data",
                label: "Datos"
              },              
              {
                href: "/list",
                label: "Areas y salas"
              },
              {
                href: "/permissions",
                label: "Permisos"
              },
            ]
          },            
          {
            href: "",
            label: "Empleados",
            icon: Contact,
            submenus: [
              {
                href: "/categories",
                label: "Categorias"
              },              
              {
                href: "/list",
                label: "Listado"
              },
              {
                href: "/schedules",
                label: "Horarios"
              },
            ]
          },          
          {
            href: "",
            label: "Entrenamiento",
            icon: Workout,
            submenus: [
              {
                href: "/exercises",
                label: "Ejercicios"
              },
              {
                href: "/routines",
                label: "Rutinas"
              },
              {
                href: "/programs",
                label: "Programs"
              },
              {
                href: "/wordkouts",
                label: "Wordkout"
              }                            
            ]
          },
          {
            href: "",
            label: "Actividades",
            icon: Calendar,
            submenus: [
              {
                href: "/groups",
                label: "Grupos"
              },              
              {
                href: "/list",
                label: "Listado"
              },
              {
                href: "/schedules",
                label: "Horarios"
              },
            ]
          },            
          {
            href: "",
            label: "Socios",
            icon: Users,
            submenus: [
              {
                href: "/groups",
                label: "Grupos"
              },              
              {
                href: "/list",
                label: "Listado"
              },
              {
                href: "/profiles",
                label: "Perfiles"
              },
            ]
          },  
        ]
      },
      {
        groupLabel: "Sessión",
        menus: [
          {
            href: "/logout",
            label: "Cerrar sesión",
            icon: Users
          }
        ]
      }      
    ];
  }
  