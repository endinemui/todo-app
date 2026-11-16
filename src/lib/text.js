const PLURAL_FORMS = {
  1: 'задача',
  2: 'задачи',
  5: 'задач',
}

function tasksNoun(count) {
  const mod100 = count % 100
  const mod10 = count % 10

  if (mod100 >= 11 && mod100 <= 14) return PLURAL_FORMS[5]
  if (mod10 === 1) return PLURAL_FORMS[1]
  if (mod10 >= 2 && mod10 <= 4) return PLURAL_FORMS[2]
  return PLURAL_FORMS[5]
}

/** "Осталась 1 задача" / "Осталось 3 задачи" / "Все задачи выполнены" */
export function remainingLabel(activeCount, totalCount) {
  if (totalCount === 0) return 'Список пуст'
  if (activeCount === 0) return 'Все задачи выполнены'

  const isSingular = activeCount % 10 === 1 && activeCount % 100 !== 11
  return `${isSingular ? 'Осталась' : 'Осталось'} ${activeCount} ${tasksNoun(activeCount)}`
}

export function progressLabel(done, total) {
  if (total === 0) return 'Пока пусто'
  if (done === total) return 'Всё готово'
  return `${done} из ${total}`
}
