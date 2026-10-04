# Fecha de vencimiento y tareas vencidas

**Identificador:** FS-118
**Épica:** E2 «Gestión de tareas»
**Origen:** [`flowsync-mvp.md`](../../prd/flowsync-mvp.md) (RF-26 y puntos abiertos PA-6)

## Historia

Como miembro del equipo, quiero poner, cambiar y quitar una fecha de vencimiento en una tarea y ver cuáles se han pasado de plazo, para saber cuándo se espera cada trabajo y qué se ha retrasado.

## Criterios de aceptación

**Marcas:** (RF-x) indica el requisito del PRD del que sale el criterio. ⚑ indica un criterio propuesto, no incluido en el PRD, pendiente de revisión. El bloque C entero es propuesta: el PRD solo pide mostrar la fecha, y marcar las vencidas exige ampliarlo y cerrar PA-6.

### A. Camino feliz

**CA-01 · Poner fecha** (RF-26)
DADO una tarea sin fecha de vencimiento
CUANDO un miembro le indica una fecha
ENTONCES la tarea muestra esa fecha en la lista.

**CA-02 · Cambiar fecha** (RF-26)
DADO una tarea con fecha
CUANDO un miembro la sustituye por otra
ENTONCES la tarea muestra solo la nueva.

**CA-03 · Quitar fecha** (RF-26)
DADO una tarea con fecha
CUANDO un miembro la quita
ENTONCES la tarea queda sin fecha, sin ningún texto en su lugar, y sigue siendo una tarea válida.

**CA-04 · La fecha es opcional** (RF-17)
DADO que un miembro crea una tarea con solo el título
CUANDO la guarda
ENTONCES se crea sin fecha y sin ningún aviso de que falta.

**CA-05 · Ver la fecha sin abrir la tarea** (RF-26)
DADO una lista con tareas con y sin fecha
CUANDO un miembro la mira
ENTONCES cada tarea con fecha la muestra junto a ella y las demás no muestran nada.

**CA-06 · Tareas de otros** (RF-26)
DADO una tarea cuyo responsable es otra persona
CUANDO un miembro cambia o quita su fecha
ENTONCES el cambio se aplica, igual que en una tarea propia.

**CA-07 · Los demás lo ven sin refrescar** (RF-23)
DADO otro miembro con la lista abierta
CUANDO se pone, cambia o quita una fecha
ENTONCES ese miembro ve el cambio sin refrescar.

**CA-08 · La fecha se conserva**
DADO una tarea con fecha
CUANDO el miembro cierra sesión y vuelve a entrar
ENTONCES la tarea sigue con la misma fecha.

**CA-09 · Fecha sin hora** (RF-26, PA-6)
DADO un miembro que indica una fecha
CUANDO la guarda
ENTONCES no se le pide hora ni huso horario. Es una fecha de calendario. [SUPUESTO del PRD, pendiente en PA-6]

### B. Edge cases y errores

**CA-10 · Fecha inválida** ⚑
DADO un miembro que escribe algo que no es una fecha válida (por ejemplo, el 31 de febrero o un texto)
CUANDO intenta guardarla
ENTONCES no se guarda, la tarea conserva la fecha que tenía y se le dice qué corregir.

**CA-11 · Quitar una fecha que no existe** ⚑
DADO una tarea sin fecha
CUANDO un miembro intenta quitarla
ENTONCES no pasa nada y no ve ningún error.

**CA-12 · La fecha no toca el resto** ⚑
DADO una tarea con estado y responsable
CUANDO se pone, cambia o quita su fecha
ENTONCES su estado y su responsable no cambian.

**CA-13 · Fecha en el pasado** ⚑
DADO un miembro que indica una fecha anterior a hoy
CUANDO la guarda
ENTONCES se acepta, porque puede reflejar un trabajo ya retrasado.

**CA-14 · Tarea borrada mientras se edita** (RF-18)
DADO un miembro que edita la fecha de una tarea que otro acaba de borrar
CUANDO intenta guardar
ENTONCES se le avisa de que la tarea ya no existe y desaparece de su lista.

**CA-15 · Dos cambios a la vez** (RF-18, [SUPUESTO] gana el último)
DADO dos miembros que cambian la fecha de la misma tarea casi a la vez
CUANDO ambos guardan
ENTONCES los dos acaban viendo la misma fecha, la del último cambio.

**CA-16 · No se pudo guardar** (RNF-6)
DADO que se pierde la conexión
CUANDO un miembro cambia una fecha
ENTONCES se le avisa de que no se guardó y la lista no muestra la fecha nueva como hecha.

**CA-17 · Sesión caducada** (RF-4)
DADO una sesión caducada
CUANDO un miembro intenta cambiar una fecha
ENTONCES no se cambia y se le pide volver a entrar.

**CA-18 · Quien no es miembro** (RF-2)
DADO una persona con cuenta que no es miembro del espacio
CUANDO intenta ver o cambiar una fecha
ENTONCES no puede ver ninguna tarea ni cambiar nada.

### C. Tareas vencidas ⚑ (todo este bloque es propuesta; no está en el PRD)

**CA-19 · Se señala la vencida** ⚑
DADO una tarea no terminada con fecha anterior a hoy
CUANDO un miembro mira la lista
ENTONCES la tarea aparece señalada como vencida, de forma que se distingue de las que no lo están.

**CA-20 · El día de la fecha no es vencida** ⚑
DADO una tarea no terminada con fecha de hoy
CUANDO un miembro mira la lista
ENTONCES no está vencida hasta que acabe ese día. [DECISIÓN PENDIENTE: el huso que marca cuándo acaba el día, ver PA-6]

**CA-21 · Terminada no se marca** ⚑
DADO una tarea terminada con fecha anterior a hoy
CUANDO un miembro mira la lista
ENTONCES muestra su fecha pero no se señala como vencida.

**CA-22 · Dejar de estar vencida** ⚑
DADO una tarea vencida
CUANDO se cambia su fecha a una futura, se quita la fecha o se pasa a terminada
ENTONCES deja de señalarse como vencida.

**CA-23 · Reabrir** ⚑
DADO una tarea terminada con fecha pasada
CUANDO alguien la devuelve a un estado no terminado
ENTONCES vuelve a señalarse como vencida.

**CA-24 · El tiempo pasa con la lista abierta** ⚑
DADO un miembro con la lista abierta
CUANDO acaba el día de la fecha de una tarea no terminada
ENTONCES pasa a señalarse como vencida sin que tenga que refrescar. Si esto es demasiado, basta con que se vea al abrir la lista.

**CA-25 · Vencida no bloquea ni avisa** ⚑
DADO una tarea vencida
CUANDO un miembro la mira, la coge, la edita o cambia su estado
ENTONCES puede hacerlo igual que con cualquier otra, y el producto no envía ningún aviso por haber vencido.
