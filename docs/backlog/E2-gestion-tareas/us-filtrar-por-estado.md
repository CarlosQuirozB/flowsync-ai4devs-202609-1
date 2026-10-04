# Filtrar las tareas por estado para centrarse en lo pendiente

**Identificador:** FS-142
**Épica:** E2 «Gestión de tareas»
**Origen:** [`flowsync-mvp.md`](../../prd/flowsync-mvp.md) (RF-21 y puntos abiertos PA-7)

## Historia

Como miembro del equipo, quiero filtrar las tareas por estado y ver primero lo pendiente al abrir la lista, para centrarme en lo que queda por hacer y elegir lo siguiente sin ruido.

## Criterios de aceptación

**Marcas:** (RF-x) indica el requisito del PRD del que sale el criterio. ⚑ indica un criterio propuesto, no incluido en el PRD, pendiente de revisión. «Pendiente» significa «no terminada» (RF-21, [SUPUESTO]). Los nombres de estado «no empezada», «en curso» y «terminada» son de referencia (RF-14).

### A. Camino feliz

**CA-01 · Vista inicial** (RF-21)
DADO una lista con tareas en varios estados
CUANDO un miembro abre la lista
ENTONCES ve las tareas no terminadas y no ve las terminadas.

**CA-02 · Filtrar por un estado** (RF-21)
DADO una lista con tareas en varios estados
CUANDO un miembro elige un estado
ENTONCES ve solo las tareas que están en ese estado.

**CA-03 · Las terminadas siguen accesibles** (RF-21)
DADO la vista inicial, que oculta las terminadas
CUANDO el miembro elige «terminada»
ENTONCES ve las tareas terminadas. Ocultarlas no las hace desaparecer.

**CA-04 · Ver todas** (RF-21, [SUPUESTO] un estado cada vez, o todos)
DADO un filtro aplicado
CUANDO el miembro elige ver todas
ENTONCES ve todas las tareas, terminadas incluidas.

**CA-05 · Se nota que hay un filtro** ⚑
DADO un filtro distinto de «todas»
CUANDO el miembro mira la lista
ENTONCES se ve cuál es el filtro activo, para no tomar una lista parcial por la completa.

**CA-06 · El filtro es de cada miembro** ⚑
DADO un miembro que filtra por un estado
CUANDO otro miembro mira la lista
ENTONCES este ve su propia vista, no la filtrada por el primero.

### B. El filtro con la lista en movimiento

**CA-07 · Cambios de otros con filtro activo** (RF-23)
DADO un miembro con el filtro «en curso»
CUANDO otro miembro pasa una tarea a «en curso», o la saca de ese estado
ENTONCES la tarea aparece o desaparece de su lista sin refrescar.

**CA-08 · Mis propios cambios** ⚑
DADO un miembro con el filtro «no empezada»
CUANDO pasa una de esas tareas a «en curso»
ENTONCES la tarea deja de verse en esa vista, sin perderse: se encuentra en su nuevo estado.

**CA-09 · Tarea nueva fuera de la vista** (RF-7, RF-23) ⚑ en la parte de quien la crea
DADO un miembro con el filtro «terminada»
CUANDO él u otro crea una tarea, que nace en el estado inicial
ENTONCES la tarea no aparece en esa vista, pero sí en la vista inicial y en «no empezada». Y quien la crea ve una confirmación de que se creó, para no creer que ha fallado.

**CA-10 · Tarea borrada** (RF-16)
DADO un filtro activo
CUANDO se borra una tarea que se estaba viendo
ENTONCES desaparece de la lista.

**CA-11 · Editar no cambia el filtro** ⚑
DADO un filtro activo
CUANDO el miembro edita el título, el responsable o la fecha de una tarea
ENTONCES el filtro sigue siendo el mismo.

**CA-12 · Volver a abrir la lista** ⚑
DADO un miembro que había filtrado por un estado
CUANDO cierra sesión y vuelve a entrar
ENTONCES ve la vista inicial, no el filtro anterior.

### C. Edge cases y errores

**CA-13 · Estado que no existe**
DADO un miembro que pide ver las tareas de un estado que no existe (por cualquier vía, por ejemplo un enlace guardado)
CUANDO se carga la lista
ENTONCES ve un aviso de que ese estado no existe, con los estados disponibles, y no una lista vacía como si no hubiera tareas.

**CA-14 · Sin sustitución silenciosa** ⚑
DADO el aviso de CA-13
CUANDO el miembro lo ve
ENTONCES la lista no se sustituye por otro filtro, como la vista inicial o todas, presentándolo como si fuera lo pedido.

**CA-15 · Estado válido sin tareas** (RF-22)
DADO un estado que existe pero no tiene tareas
CUANDO el miembro lo elige
ENTONCES se le dice que no hay tareas en ese estado. Es un mensaje distinto del de CA-13.

**CA-16 · Todo está terminado** (RF-22) ⚑
DADO un espacio donde todas las tareas están terminadas
CUANDO el miembro abre la vista inicial
ENTONCES se le dice que no hay tareas pendientes, no que no hay tareas, y puede ver las terminadas. No se le invita a crear «la primera».

**CA-17 · Espacio sin ninguna tarea** (RF-22)
DADO un espacio sin tareas
CUANDO el miembro abre la lista
ENTONCES se le dice que no hay tareas y se le invita a crear la primera.

**CA-18 · Se pierden las actualizaciones** (RF-24, RF-23)
DADO un filtro activo
CUANDO la lista deja de recibir cambios
ENTONCES se avisa igual que sin filtro, y al recuperarse muestra el estado actual respetando el filtro.

**CA-19 · Sesión caducada** (RF-4)
DADO una sesión caducada
CUANDO el miembro intenta filtrar
ENTONCES no ve tareas y se le pide volver a entrar.

**CA-20 · Quien no es miembro** (RF-2)
DADO una persona con cuenta que no es miembro del espacio
CUANDO intenta ver o filtrar tareas
ENTONCES no ve ninguna.
