# PRD: FlowSync MVP

**Estado:** borrador.
**Base:** [`alcance-mvp.md`](alcance-mvp.md), alcance consensuado. Si este PRD y el alcance difieren, manda el alcance hasta que se corrija uno de los dos. **Excepción:** la fecha de vencimiento está dentro del MVP por decisión posterior al alcance; `alcance-mvp.md` todavía la lista como excluida y debe actualizarse (no se ha tocado aquí).
**Validación:** caso de estudio, no cliente real. Lo que aquí se afirma es hipótesis, no resultado de uso.
**Convención:** `[SUPUESTO]` marca algo que se da por cierto sin haberlo comprobado, o un valor provisional que hay que confirmar. Este documento es de producto: no fija endpoints, tablas, modelo de datos ni arquitectura.

---

## 1. Problema y contexto

En equipos remotos pequeños el estado del trabajo solo se conoce preguntando. La ronda de «¿en qué estás?» se come la mitad de la daily de 15 minutos y se repite por chat. Nadie ve el estado del equipo sin interrumpir a alguien.

El coste que importa es el trabajo duplicado, no la interrupción. Episodio concreto: dos personas tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera. Dos días perdidos.

Contexto del producto:

- FlowSync hoy solo tiene cuentas (registro, login, perfil, cierre de sesión). Las tareas no existen.
- Sustituye al gestor de tareas del equipo, no convive con él.
- La daily no desaparece entera: la parte de bloqueos sigue y este MVP no la resuelve.
- Primer usuario: un equipo de 6 personas de producto SaaS en 3 husos horarios. **Es un caso de estudio, no un cliente real.**

## 2. Usuarios y jobs-to-be-done

**Usuarios.** Equipos remotos de 3 a 10 personas con roles planos: todos ven y editan lo mismo. Quien cobra el valor son los pares, no un lead; no hay reporte hacia arriba. Quien escribe el estado es quien lo lee.

**Jobs-to-be-done:**

| # | Cuando… | Quiero… | Para… |
|---|---|---|---|
| JTBD-1 | voy a elegir qué hacer a continuación | ver qué está libre y qué está tocando ya alguien | no empezar algo duplicado |
| JTBD-2 | empiezo, cojo o termino un trabajo | dejarlo reflejado en segundos y sin campos que rellenar | que el resto lo sepa sin que yo tenga que contarlo |
| JTBD-3 | necesito saber cómo va el equipo | consultar el estado actual de las tareas sin preguntar a nadie | no interrumpir ni ser interrumpido |

**Supuestos de usuario:**

- [SUPUESTO] Un solo equipo por espacio.
- [SUPUESTO] Confianza total entre miembros, incluida la edición de tareas ajenas.
- [SUPUESTO] La daily seguirá existiendo para los bloqueos.

## 3. Propuesta de valor

**El estado del equipo se ve de un vistazo, sin preguntar.** Quien hace la tarea cambia su estado en dos clics y el resto lo ve sin refrescar ni preguntar.

La decisión que cambia: no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre.

«Tiempo real» significa que los cambios de estado de las **tareas** se ven sin refrescar. No es presencia de personas, ni chat, ni videollamada, ni edición simultánea de un documento.

Por qué se sostiene: son dos clics sobre una lista ya abierta, sin campos obligatorios y sin sprints ni estimaciones. [SUPUESTO] La lista es también la cola de trabajo de quien la escribe, y ese sería su motivo para mantenerla. Sin vista por persona, ese beneficio no está garantizado (ver PA-1).

**Riesgos a validar:**

1. **La información se queda vieja.** Es el riesgo principal: si pasa, el producto pierde el sentido. La mitigación es que actualizar cueste dos clics, no obligar a nadie. Se vigila con M3, que es una comprobación manual (ver §9).
2. **El hábito que evita el trabajo duplicado es crear la tarea antes de empezar**, no solo actualizarla. Solo se puede contrastar de forma informal, repasando con el equipo el episodio de los dos días perdidos. El producto no avisa de que dos tareas distintas tocan lo mismo: solo muestra qué tareas hay, su estado y su responsable (ver PA-3).
3. **Migrar duele.** Sustituir el gestor actual obliga a rehacer a mano el trabajo en curso, y mantener los dos supone doble actualización.

## 4. Alcance / Fuera de alcance

### Dentro del MVP

Una sola capability, terminada de punta a punta: la lista compartida.

1. Un espacio compartido único.
2. Crear una tarea en segundos; solo el título es obligatorio.
3. Responsable opcional; una tarea sin responsable está libre.
4. Cambiar el estado en dos clics, con pocos estados fijos.
5. Filtrar por estado; los cambios de otros aparecen solos mientras la lista está abierta.
6. Corregir el título y borrar una tarea.
7. Acceso restringido a miembros del espacio.
8. Fecha de vencimiento opcional en cada tarea.

Guardarraíles: ningún campo obligatorio más allá del título, y el estado es de la tarea, nunca de la persona.

### Fuera del MVP

«Qué se ha movido desde tu última visita» · varios equipos · roles y permisos · notificaciones push · presencia y actividad de personas · chat, comentarios y descripciones largas · edición simultánea de un documento · derivar el estado de Git, CI o calendario · importar o sincronizar con otro gestor · sprints, estimaciones, épicas, backlog e informes · resolver bloqueos · estados configurables · etiquetas, módulo o área · vista por persona, búsqueda y orden personalizado · historial y auditoría.

La justificación de cada exclusión está en `alcance-mvp.md`, salvo la de la fecha de vencimiento, que ya no es una exclusión. Candidatos a volver primero: «qué se ha movido desde tu última visita» y vista por persona.

### Tensiones conocidas del alcance

Quedan abiertas a propósito y se validan con el caso de estudio:

- **El tiempo real puede llegar poco.** Con 3 husos horarios es poco probable que dos personas tengan la lista abierta a la vez. [SUPUESTO] El valor principal llega al abrir la lista y ver el estado actual; la actualización en vivo es secundaria. No hay resumen ni aviso al volver, porque están fuera de alcance.
- **No hay vista «mis tareas» ni filtro «libres».** El único filtro es por estado. Para saber qué está libre hay que mirar el responsable de cada tarea de la lista, que con 3 a 10 personas se recorre entera. Si se echa en falta, es el primer candidato a volver.
- **El mecanismo de acceso está sin decidir.** Hoy el registro está abierto a cualquiera. Quién es miembro y cómo entra se decide en diseño (ver RF-2 y RF-3).

## 5. Épicas del MVP

- **E1 «Cuentas y acceso»:** quién puede entrar al espacio compartido y cómo se mantiene su sesión.
- **E2 «Gestión de tareas»:** crear, asignar, cambiar de estado, ponerles fecha de vencimiento, filtrarlas por estado, corregir y borrar tareas.
- **E3 «Actividad del equipo»:** ver el estado actual de las tareas del equipo y recibir los cambios de otros sin refrescar.

Aclaraciones: «actividad» es la de las **tareas**, no la de las personas (la presencia y la actividad de personas están fuera de alcance, ver RF-25). Y «épicas» son aquí solo agrupaciones de este documento: no hay épicas como concepto dentro del producto.

## 6. Requisitos funcionales

Cada requisito se puede comprobar con una acción y un resultado observable. Trazabilidad con el alcance (§4): punto 1 → RF-5; 2 → RF-6, RF-7; 3 → RF-7 a RF-11; 4 → RF-12 a RF-14; 5 → RF-21 a RF-24; 6 → RF-15, RF-16; 7 → RF-2 a RF-4; 8 → RF-26. La numeración es estable y no sigue el orden de las épicas: RF-21 (filtro por estado) y RF-26 (fecha de vencimiento) pertenecen a E2.

### E1 Cuentas y acceso

- **RF-1.** Una persona puede registrarse, iniciar sesión y cerrar sesión con email y contraseña. Con credenciales incorrectas o vacías, o con un email ya registrado, recibe un mensaje que le dice qué corregir. Tras cerrar sesión no puede ver ni modificar tareas hasta iniciarla de nuevo. *(Comportamiento actual, que debe mantenerse.)*
- **RF-2.** Solo los miembros del espacio pueden ver y modificar tareas. Una persona con cuenta que no sea miembro no ve ninguna tarea y no puede crear, editar ni borrar ninguna.
- **RF-3.** Existe una forma de que una persona pase a ser miembro, y tras hacerlo ve la lista del equipo. [SUPUESTO] El mecanismo (invitación, aprobación u otro) y quién es el primer miembro se deciden en diseño; este PRD solo exige el comportamiento de RF-2.
- **RF-4.** Si la sesión caduca o se cierra en otro sitio mientras la persona tiene la lista abierta, la lista deja de mostrar tareas y la persona ve que debe volver a entrar. No se queda mirando información que ya no puede ver. (Perder la pertenencia al espacio con la lista abierta no se especifica: este PRD no define ninguna forma de dejar de ser miembro. Ver PA-5.)

### E2 Gestión de tareas

- **RF-5.** Todos los miembros ven y editan la misma lista de tareas. No hay listas por persona ni por equipo.
- **RF-6.** Un miembro puede crear una tarea indicando solo el título. Un título vacío, o solo de espacios, no crea la tarea y se avisa del motivo. [SUPUESTO] Longitud máxima del título: 200 caracteres.
- **RF-7.** Una tarea nueva nace **libre** (sin responsable) y en el estado inicial. [SUPUESTO] Quien la crea puede cogerla en el mismo gesto, sin crear y coger por separado.
- **RF-8.** *Libre* significa **sin responsable**, y solo eso. Es la única definición, la del alcance, y no depende del estado.
- **RF-9.** Un miembro puede coger una tarea libre con un solo clic y queda como su responsable. Si estaba en el estado inicial, pasa a «en curso». Así, una tarea cogida muestra siempre que alguien la está tocando.
- **RF-10.** Una tarea «en curso» siempre tiene responsable. Si un miembro pasa a «en curso» una tarea libre, queda a su nombre. Si se quita el responsable de una tarea «en curso», vuelve al estado inicial. [SUPUESTO] Confirmar en diseño; es lo que hace que estado y responsable no se contradigan.
- **RF-11.** Un miembro puede quitar el responsable de una tarea, que vuelve a estar libre. [SUPUESTO] También puede asignarla a otra persona, por la confianza total entre miembros.
- **RF-12.** Cada tarea tiene siempre exactamente un estado, de un conjunto reducido y fijo. Los miembros no pueden crear, renombrar ni borrar estados.
- **RF-13.** Desde la lista, un miembro cambia el estado de una tarea en como máximo dos clics.
- **RF-14.** El conjunto de estados debe permitir distinguir al menos: no empezada, en curso y terminada. [SUPUESTO] Entre 3 y 5 estados en total. Los nombres concretos se deciden en diseño; «no empezada», «en curso» y «terminada» se usan en este documento como nombres de referencia.
- **RF-15.** Un miembro puede corregir el título de una tarea, también la de otra persona. El título nuevo cumple las mismas reglas que RF-6.
- **RF-16.** Un miembro puede borrar una tarea, también la de otra persona. [SUPUESTO] Antes de borrar se pide confirmación, porque no hay historial ni deshacer. La tarea desaparece de la lista para todos.
- **RF-17.** Ninguna operación sobre tareas exige rellenar más campos que el título. (El registro de cuenta sigue pidiendo email y contraseña, RF-1.)
- **RF-18.** Cuando dos miembros actúan a la vez sobre la misma tarea:
  - Si ambos cogen la misma tarea libre, solo uno queda como responsable y el otro ve quién la ha cogido; no la sobrescribe.
  - Si alguien edita o cambia una tarea que otro acaba de borrar, se le avisa de que ya no existe y la tarea desaparece de su lista.
  - En el resto de cambios simultáneos sobre una tarea, ambos acaban viendo el mismo resultado final. [SUPUESTO] Basta con que gane el último cambio.
- **RF-21.** Un miembro puede filtrar la lista por estado. La vista inicial muestra las tareas **no terminadas**, [SUPUESTO] que es lo que el alcance llama «lo pendiente». [SUPUESTO] El filtro elige un estado cada vez, o todos.
- **RF-26.** Un miembro puede indicar, cambiar o quitar la fecha de vencimiento de una tarea, también la de otra persona. Es opcional (RF-17) y la lista la muestra junto a la tarea. [SUPUESTO] Es una fecha de calendario, sin hora ni huso horario (ver PA-6).

### E3 Actividad del equipo

- **RF-19.** La lista muestra, para cada tarea, su título, su estado y su responsable (o que está libre), sin necesidad de abrirla. Del responsable se muestra el nombre y, si no lo ha indicado, el email.
- **RF-20.** Al abrir la lista se ve el estado actual de las tareas de la vista inicial (RF-21).
- **RF-22.** Con la lista vacía, o con un filtro sin resultados, se dice que no hay tareas, y en el primer caso se invita a crear la primera.
- **RF-23.** Cuando otro miembro crea, cambia, asigna, corrige o borra una tarea, el cambio aparece en la lista de quien la tiene abierta sin que tenga que refrescar, y respeta el filtro activo.
- **RF-24.** Si la lista deja de recibir cambios (por ejemplo, por pérdida de conexión), el usuario lo ve de forma visible en un plazo de 30 segundos [SUPUESTO], para no fiarse de información vieja. Al recuperarse, la lista muestra el estado actual (RF-20).
- **RF-25.** El producto no muestra a nadie si otra persona está conectada o activa. Lo único que se ve de una persona es lo que figura en las tareas: al ser el responsable un dato de la tarea, la lista deja ver qué tiene cada persona entre manos. Eso es inherente al producto y no se puede evitar sin quitar el responsable.

## 7. Requisitos no funcionales

- **RNF-1. Rapidez de uso.** Crear una tarea lleva como máximo 10 segundos desde que se abre la lista. [SUPUESTO] Valor a confirmar con el caso de estudio.
- **RNF-2. Frescura.** Un cambio hecho por un miembro es visible para los demás con la lista abierta en menos de 5 segundos. [SUPUESTO]
- **RNF-3. Capacidad.** El producto funciona sin degradarse con 10 personas en el espacio y 500 tareas. [SUPUESTO]
- **RNF-4. Privacidad y confianza.** Ninguna pantalla muestra si una persona está conectada o activa (ver RF-25). Las contraseñas no se muestran en ningún sitio.
- **RNF-5. Seguridad de acceso.** Ninguna información de tareas es accesible sin sesión iniciada y pertenencia al espacio (ver RF-2 y RF-4).
- **RNF-6. Fiabilidad.** Un cambio confirmado al usuario no se pierde. Si un cambio falla, se avisa y la lista no muestra como hecho algo que no se guardó.
- **RNF-7. Idioma.** Toda la interfaz y los mensajes de error están en castellano, como los de las cuentas actuales.
- **RNF-8. Compatibilidad.** Funciona en las versiones actuales de los navegadores de escritorio más usados. [SUPUESTO] Móvil queda fuera de las pruebas del MVP.
- **RNF-9. Accesibilidad.** Crear una tarea, cogerla y cambiar su estado se pueden hacer solo con teclado. [SUPUESTO]

## 8. Restricciones

- **Stack:** backend AdonisJS 7 y frontend React 19. El MVP se construye sobre ellos, sin cambiar de tecnología.
- **Auth existente:** registro, login, perfil y cierre de sesión ya funcionan. El registro hoy está abierto a cualquiera; el MVP debe restringir el acceso a tareas (RF-2) sin romper estas capacidades (RF-1).
- **Punto de partida:** no existe ninguna capacidad de tareas ni de espacio compartido.
- **Un solo espacio y un solo equipo** de 3 a 10 personas.
- **Caso de estudio:** no hay usuarios reales ni datos de uso previos. [SUPUESTO] El recorrido se valida con el equipo descrito en el contexto, sin cifras de mercado.
- **Alcance cerrado:** no se añade nada de la lista «fuera del MVP» sin cambiar antes `alcance-mvp.md`.

## 9. Métricas de éxito

Ninguna métrica exige registrar la actividad de cada persona (ver RF-25): se miden con la lista tal como está y con preguntas al equipo.

**Criterio de éxito (con uso real):**

| # | Métrica | Cómo se mide | Umbral |
|---|---|---|---|
| M1 | La ronda de «¿en qué estás?» se cancela | Pregunta directa al equipo tras una semana de uso real. Es una respuesta subjetiva de un solo equipo en una semana: no separa el efecto del producto del de haber decidido probarlo | Se cancela y nadie pide que vuelva |
| M2 | Trabajo duplicado | Casos de «dos personas en lo mismo» que el equipo cuente al cierre de esa semana | **Ninguno: no es medible en el MVP.** Con un equipo, una semana y sin línea base no distingue el efecto del producto del azar, y quien no se entera no puede contarlo. Se anota, pero no sirve para decidir |

**Métricas de apoyo:**

| # | Métrica | Cómo se mide | Umbral |
|---|---|---|---|
| M3 | Información vieja (riesgo principal) | Al cierre de la semana, el equipo repasa las tareas «en curso» y cuenta las que ya no reflejan la realidad. Es una revisión manual, es decir, una ronda de sincronización, justo lo que el producto quiere evitar; solo vale durante el piloto | Menos del 20 % [SUPUESTO] |
| M4 | Participación (comprobación de adopción, no de valor) | Al cierre de la semana, el equipo confirma quién ha creado o movido alguna tarea | Todos los miembros [SUPUESTO] |
| M5 | Coste de actualizar | Clics para cambiar de estado (RF-13) y segundos para crear una tarea (RNF-1), probados a mano | ≤ 2 clics y ≤ 10 s [SUPUESTO] |

**Validación mientras sea caso de estudio.** M1 y M2 solo se pueden medir con uso real, así que antes de eso se comprueba el recorrido: una persona crea una tarea, otra la coge y la mueve de estado, y una tercera lo ve en la lista abierta sin preguntar a nadie ni refrescar. Se considera superado si se completa sin ayuda y cumple M5. Esto comprueba que el software funciona; **no valida** la hipótesis del producto.

Si tras una semana la ronda de «¿en qué estás?» sigue igual, el MVP no ha funcionado. Este PRD no define qué se hace después (ver PA-11).

## 10. Puntos abiertos

Decisiones de producto que este PRD no toma. Cada una lleva el argumento resumido y lo que haría falta para decidirla. Mientras no se decidan, rige el texto del PRD tal como está. Ver también las tensiones de §4.

- **PA-1. Qué motiva a quien escribe el estado.** El PRD supone que mantener la lista le beneficia porque es su cola de trabajo, pero no hay vista por persona y la lista es de todos. Si el escritor ya sabe lo que hace, el beneficio lo recibe el lector. *Para decidir:* observar en el caso de estudio si quien escribe consulta la lista; si no, valorar traer la vista por persona (hoy fuera, candidata a volver).
- **PA-2. Dejar el gestor actual.** El éxito exige sustituirlo, y la importación está fuera: migrar es rehacer a mano el trabajo en curso, o mantener los dos. *Para decidir:* cuántas tareas en curso tiene el equipo hoy y si aceptan rehacerlas; con eso, valorar una importación puntual o asumir la migración a mano.
- **PA-3. Solape entre tareas distintas.** El episodio real fue dos personas en el mismo módulo, no en la misma tarea. Con título libre y sin etiquetas, la lista no lo señala. *Para decidir:* repasar con el equipo qué títulos habrían tenido las dos tareas del episodio y si bastaba con verlas juntas; si no, valorar etiquetas o módulo (hoy fuera).
- **PA-4. Coger una tarea y pasarla a «en curso» (RF-9, RF-10).** Coger en un clic y pasar a «en curso» invita a reservar tareas sin trabajarlas, que es información vieja por diseño. Sin esa regla, estado y responsable pueden contradecirse. *Para decidir:* qué significa coger (reservar o empezar) y si hace falta alguna señal de antigüedad; probarlo en el piloto.
- **PA-5. Cómo se entra y se sale del espacio (RF-2 a RF-4).** Quién es miembro, cómo se da de alta y, sobre todo, cómo y quién da de baja. Con roles planos y sin permisos nadie tiene autoridad para expulsar, y el PRD no define baja. Es en la práctica una noción de equipo con invitaciones, que el alcance excluyó. *Para decidir:* el mecanismo mínimo (por ejemplo, invitación o lista de emails permitidos), quién puede dar de baja y qué ve quien tiene la lista abierta cuando le dan de baja.
- **PA-6. Fecha de vencimiento (RF-26).** Está dentro del MVP. Dudas pendientes: con 3 husos horarios «vence el martes» es ambiguo; sin vista de vencidas ni orden por fecha, la fecha solo se lee. *Para decidir:* fecha sola o con hora, en qué huso, y si las tareas vencidas se marcan o la fecha es solo informativa.
- **PA-7. Cómo funciona el filtro por estado (RF-21).** Está dentro del MVP. Sin decidir: uno o varios estados a la vez, y qué cuenta como dos clics (¿abrir un menú y elegir?). Tampoco hay filtro de tareas libres ni propias, así que «ver qué está libre» (JTBD-1) se hace recorriendo la lista. *Para decidir:* el diseño del filtro y si «libres» es un filtro más.
- **PA-8. Conjunto de estados y tareas muertas (RF-12 a RF-14).** Tres estados mínimos no distinguen una tarea terminada de una abandonada, y sin archivo la lista se llena de terminadas. *Para decidir:* número y significado de los estados y si hace falta descartar o archivar.
- **PA-9. Reglas de detalle de la edición (RF-7, RF-11, RF-16, RF-18).** Crear y coger en un gesto, reasignar a otra persona, confirmar antes de borrar y resolver cambios simultáneos son añadidos de este PRD, no del alcance. Subsanables al diseñar. *Para decidir:* si cada uno merece su coste en el MVP o se recorta.
- **PA-10. Valores no funcionales provisionales (RF-24, RNF-2, RNF-3, RNF-8, RNF-9).** Todos son [SUPUESTO]. Entregar cambios en 5 s y detectar su pérdida en 30 s empuja a una conexión persistente o a sondeo, un coste de tiempo real para un valor que §4 llama secundario. *Para decidir:* con qué frecuencia coinciden dos personas con la lista abierta en el caso de estudio, y el coste de cada alternativa técnica.
- **PA-11. Qué medir y qué hacer después.** M1 y M2 no se pueden medir de verdad con un equipo en una semana, M3 es manual y M4 y M5 son comprobaciones de diseño. Nada mide si alguien elige lo libre en vez de preguntar. Medirlo sin identificar personas (por ejemplo, la antigüedad del último cambio de cada tarea) choca con la postura de RF-25 si implica registrar cambios. Tampoco hay regla de qué hacer si el piloto falla. *Para decidir:* duración del piloto (una semana es corta frente a la novedad), umbrales y una regla explícita de continuar, cambiar o parar.
