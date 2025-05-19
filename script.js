const dannyeKviza = [
  { vopros: "Какой тип данных используется для хранения целых чисел в Python?", otvety: ["str", "float", "int", "bool"], pravilnyy: "int" },
  { vopros: "Как создать список в Python?", otvety: ["{}", "[]", "()", "<>"], pravilnyy: "[]" },
  { vopros: "Какой тег HTML делает текст жирным?", otvety: ["<i>", "<p>", "<b>", "<u>"], pravilnyy: "<b>" },
  { vopros: "Какой HTTP-метод используется для отправки формы?", otvety: ["GET", "POST", "PUT", "DELETE"], pravilnyy: "POST" },
  { vopros: "Что означает аббревиатура CSS?", otvety: ["Central Style Sheet", "Cascading Style Sheet", "Creative Style Syntax", "Computer Style System"], pravilnyy: "Cascading Style Sheet" },
  { vopros: "Как объявить переменную в JavaScript?", otvety: ["let", "var", "const", "все перечисленные"], pravilnyy: "все перечисленные" },
  { vopros: "Какой символ обозначает комментарий в Python?", otvety: ["#", "//", "--", "/* */"], pravilnyy: "#" },
  { vopros: "Какой тег HTML создаёт ссылку?", otvety: ["<a>", "<link>", "<href>", "<url>"], pravilnyy: "<a>" },
  { vopros: "Как получить данные из API с помощью fetch?", otvety: ["fetch.get()", "fetch('url')", "fetch.send()", "fetch.request()"], pravilnyy: "fetch('url')" },
  { vopros: "Какая функция выводит данные в консоль Python?", otvety: ["print()", "console.log()", "echo()", "write()"], pravilnyy: "print()" }
];

function KvizPrilozhenie() {
  const [tekushiyVopros, ustanovitTekushiyVopros] = React.useState(0);
  const [schet, ustanovitSchet] = React.useState(0);
  const [pokazatRezultat, ustanovitPokazatRezultat] = React.useState(false);
  const [vybrannyeOtvety, ustanovitVybrannyeOtvety] = React.useState({});

  const obrabotatOtvet = function(vybrannyy) {
    const novyeOtvety = Object.assign({}, vybrannyeOtvety, { [tekushiyVopros]: vybrannyy });
    ustanovitVybrannyeOtvety(novyeOtvety);

    if (vybrannyy === dannyeKviza[tekushiyVopros].pravilnyy) {
      ustanovitSchet(schet + 1);
    }

    const sleduyushiyVopros = tekushiyVopros + 1;
    if (sleduyushiyVopros < dannyeKviza.length) {
      ustanovitTekushiyVopros(sleduyushiyVopros);
    } else {
      ustanovitPokazatRezultat(true);
    }
  };

  const perezapustitKviz = function() {
    ustanovitTekushiyVopros(0);
    ustanovitSchet(0);
    ustanovitPokazatRezultat(false);
    ustanovitVybrannyeOtvety({});
  };

  return React.createElement(
    'div',
    { className: 'quiz-container' },
    pokazatRezultat
      ? React.createElement(
          'div',
          { className: 'result-container' },
          React.createElement('h2', { className: 'result-title' }, 'Квиз завершен!'),
          React.createElement(
            'p',
            { className: 'result-score' },
            'Ваш результат: ',
            React.createElement('strong', null, schet),
            ' из ',
            dannyeKviza.length,
            ' вопросов'
          ),
          React.createElement(
            'div',
            { className: 'answers-review' },
            dannyeKviza.map(function(item, index) {
              const otvetPolzovatelya = vybrannyeOtvety[index];
              const pravilno = otvetPolzovatelya === item.pravilnyy;

              return React.createElement(
                'div',
                { key: index, className: 'answer-item' },
                React.createElement(
                  'p',
                  null,
                  React.createElement('strong', null, index + 1 + '. ' + item.vopros)
                ),
                React.createElement(
                  'p',
                  null,
                  'Ваш ответ: ',
                  React.createElement(
                    'span',
                    { className: pravilno ? 'user-answer-correct' : 'user-answer-wrong' },
                    otvetPolzovatelya || 'Не ответили'
                  )
                ),
                !pravilno &&
                  React.createElement(
                    'p',
                    null,
                    'Правильный ответ: ',
                    React.createElement('span', { className: 'correct-answer' }, item.pravilnyy)
                  )
              );
            })
          ),
          React.createElement(
            'button',
            { className: 'restart-btn', onClick: perezapustitKviz },
            'Начать заново'
          )
        )
      : React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            { className: 'quiz-header' },
            React.createElement(
              'p',
              { className: 'question-number' },
              'Вопрос ',
              tekushiyVopros + 1,
              ' из ',
              dannyeKviza.length
            ),
            React.createElement(
              'p',
              { className: 'question-text' },
              dannyeKviza[tekushiyVopros].vopros
            )
          ),
          dannyeKviza[tekushiyVopros].otvety.map(function(otvet, index) {
            return React.createElement(
              'button',
              {
                key: index,
                className: 'answer-btn',
                onClick: function() {
                  obrabotatOtvet(otvet);
                }
              },
              otvet
            );
          })
        )
  );
}

const koren = ReactDOM.createRoot(document.getElementById('root'));
koren.render(React.createElement(KvizPrilozhenie, null));