const Examples = [[
  3, 0, 4, 0, 0, 0, 0, 2, 9,
  0, 0, 2, 0, 4, 9, 0, 5, 8,
  0, 1, 9, 0, 0, 0, 3, 0, 0,
  2, 0, 0, 6, 8, 3, 0, 0, 1,
  0, 7, 8, 0, 1, 0, 0, 0, 0,
  9, 3, 0, 4, 0, 0, 0, 6, 5,
  0, 8, 0, 7, 6, 0, 0, 1, 2,
  4, 0, 7, 0, 0, 2, 5, 0, 0,
  1, 2, 0, 0, 0, 0, 0, 3, 0
], [
  3, 0, 0, 0, 0, 0, 1, 0, 5,
  0, 0, 0, 2, 0, 8, 3, 6, 0,
  0, 0, 6, 7, 0, 3, 0, 0, 0,

  2, 0, 0, 1, 8, 0, 7, 0, 0,
  0, 0, 0, 0, 6, 2, 4, 0, 0,
  0, 5, 0, 3, 0, 4, 0, 0, 0,

  8, 9, 0, 0, 0, 0, 0, 2, 0,
  0, 2, 0, 6, 0, 0, 8, 1, 3,
  0, 0, 0, 0, 0, 0, 5, 9, 0
], [
  0, 2, 0, 6, 0, 3, 0, 0, 0,
  0, 0, 9, 0, 0, 0, 3, 0, 0,
  0, 8, 0, 0, 0, 0, 0, 4, 0,

  0, 0, 0, 0, 0, 0, 4, 5, 7,
  0, 0, 0, 1, 0, 0, 0, 0, 9,
  0, 0, 0, 9, 2, 0, 0, 0, 8,

  7, 0, 5, 0, 0, 9, 0, 0, 0,
  4, 0, 0, 0, 7, 0, 8, 0, 0,
  0, 0, 0, 0, 5, 0, 0, 0, 0
], [
  0, 9, 0, 6, 0, 0, 0, 0, 0,
  0, 0, 0, 8, 3, 1, 0, 0, 0,
  1, 6, 0, 0, 0, 0, 2, 0, 0,

  0, 7, 0, 0, 9, 0, 1, 0, 0,
  0, 0, 0, 0, 5, 7, 9, 0, 0,
  0, 0, 6, 0, 0, 0, 0, 0, 3,

  0, 3, 8, 0, 0, 5, 0, 0, 0,
  6, 0, 0, 0, 0, 0, 7, 0, 4,
  0, 0, 0, 0, 0, 0, 0, 1, 0
], [
  8, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 3, 6, 0, 0, 0, 0, 0,
  0, 7, 0, 0, 9, 0, 2, 0, 0,

  0, 5, 0, 0, 0, 7, 0, 0, 0,
  0, 0, 0, 0, 4, 5, 7, 0, 0,
  0, 0, 0, 1, 0, 0, 0, 3, 0,

  0, 0, 1, 0, 0, 0, 0, 6, 8,
  0, 0, 8, 5, 0, 0, 0, 1, 0,
  0, 9, 0, 0, 0, 0, 4, 0, 0
]
]
function generateFace() {
  let $rootDiv = $("div.root")
  $rootDiv.empty()
  let $sudokuLayer = $("<div>", { class: "sudoku-layer" })
  $rootDiv.append($sudokuLayer)
  let $buttonLayer = $("<div>", { class: "button-layer" })
  let $solveButton = $("<button>").text("Решить")
  let $restartButton = $("<button>").text("Заново")
  $restartButton.click(() => {
    generateFace()
  })
  $solveButton.click(() => {
    solve()
  })
  $buttonLayer.append($solveButton, $restartButton)
  let $examplesLayer = $("<div>", { class: "examples-layer" })
  let $examplesTitle = $("<div>", { class: "title" }).text("Примеры")
  let $examplesBox = $("<div>", { class: "examples-box" })

  for (let ex in Examples) {
    let btn = $("<button>").text(Number(ex) + 1)
    btn.click(() => {
      generateFace()
      setValues(Examples[ex], "user")
    })
    $examplesBox.append(btn)
  }
  $examplesLayer.append($examplesTitle, $examplesBox)
  let $table = $("<table>")
  let inputs = []
  for (let i = 1; i < 10; i++) {
    let row = $("<tr>")
    if (i % 3 == 0) {
      row.addClass("under")
    }
    for (let j = 1; j < 10; j++) {
      let cell = $("<td>")
      let input = $("<input>", { id: inputs.length + 1 })
      input.on("input", () => {
        let v = input.val()
        for (let j of v) {
          let fl = false
          for (let i of ["1", "2", "3", "4", "5", "6", "7", "8", "9"]) {
            if (j == i) { fl = true }
          }
          if (!fl) {
            input.val("")
          }
        }
        if (input.val().length > 1) {
          input.val(input.val()[1])
        }
        if (input.val()) {
          input.addClass("user")
        }
        else {
          input.removeClass("user")
        }
      })
      inputs.push(input)
      cell.append(input)
      if (j % 3 == 0) {
        cell.addClass("right")
      }
      row.append(cell)
    }
    $table.append(row)
  }
  $(document).on("keydown", (e) => {
    function focusInput(i) {
      let inp = inputs[i][0]
      inp.focus()
      inp.setSelectionRange(inp.value.length, inp.value.length)
    }
    for (let i in inputs) {
      i = Number(i)
      if (inputs[i].is(":focus")) {
        if (e.originalEvent.code == "ArrowUp") {
          if (i > 8) {
            focusInput(i - 9)
          }
        }
        if (e.originalEvent.code == "ArrowDown") {
          if (i < 72) {
            focusInput(i + 9)
          }
        }
        if (e.originalEvent.code == "ArrowRight") {
          if (i < 80) {
            focusInput(i + 1)
          }
        }
        if (e.originalEvent.code == "ArrowLeft") {
          if (i > 0) {
            focusInput(i - 1)
          }
        }
        break
      }
    }
  })
  $sudokuLayer.append($examplesLayer, $table, $buttonLayer,)
}
generateFace()
function getValues() {
  let table = $(".sudoku-layer table")
  let inputs = $("input", table)
  let ans = []
  inputs.each((i) => {
    let val = inputs[i].value
    val = Number(val)
    ans.push(val)
  })
  return ans
}
function setValues(vals, clas) {
  let table = $(".sudoku-layer table")
  let inputs = $("input", table)
  inputs.each((i) => {
    let v = String(vals[i])
    if (v == "0") { v = "" }
    inputs[i].value = v
    if (v) $(inputs[i]).addClass(clas)
  })
}
function solve() {
  let values = getValues()
  let fl = true
  let coun = 0
  for (let i in values) {
    if (values[i] != 0) {
      fl = false
      coun += 1
    }
  }
  if (coun < 17) {
    alert("Слишком мало данных")
    return
  }
  if (fl || !ValidateVariants(values)) {
    alert("Данные не правильные")
    return
  }
  let table = $(".sudoku-layer table")
  let inputs = $("input", table)
  $(document).off("keydown")
  inputs.each((i) => {
    inputs[i].setAttribute("disabled", true)
  })
  let solved = solveSudoku(values)
  if (solved) {
    setValues(solved)
    $(".sudoku-layer").addClass("solved")
  }
  else {
    generateFace()
    alert("Ошибка!!")
    setValues(values)
  }
}


function solveSudoku(vals) {
  if (vals.length != 81) return
  let ans = []
  let variants = []
  for (let i in vals) {
    let vars = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    if (vals[i] != 0) {
      vars = [vals[i]]
    }
    variants.push(vars)
  }


  function solveVariantsByRules(variants) {
    variants = JSON.parse(JSON.stringify(variants))

    let done = false
    function work(i) {
      let varlen = 0
      for (let i in variants) {
        varlen += variants[i].length
      }
      if (varlen == 81 || done) {
        done = true
        return
      }

      if (variants[i].length == 1) {
        let val = variants[i][0]

        //убираем варианты из той же строки
        let rownumb = Math.floor(i / 9)
        for (let j = rownumb * 9; j < (rownumb + 1) * 9; j++) {
          if (j != i) {
            variants[j] = variants[j].filter((number) => number !== val)
          }
        }

        //убираем варианты из того же столбца
        let columnnumb = i % 9
        for (let j in variants) {
          if (columnnumb == j % 9) {
            if (j != i) {
              variants[j] = variants[j].filter((number) => number !== val)
            }
          }
        }

        //убираем варианты из того же квадрата
        let rowSqnumb = Math.floor(Math.floor(i / 9) / 3)
        let colSqumb = Math.floor(i % 9 / 3)
        for (let j in variants) {
          if (colSqumb == Math.floor(j % 9 / 3) && rowSqnumb == Math.floor(Math.floor(j / 9) / 3)) {
            if (j != i) {
              variants[j] = variants[j].filter((number) => number !== val)
            }
          }
        }
      }
      else {
        for (let v of variants[i]) {

          //убираем варианты из той же строки
          let flRow = true
          let rownumb = Math.floor(i / 9)
          for (let j = rownumb * 9; j < (rownumb + 1) * 9; j++) {
            for (let v1 of variants[j]) {
              if (v == v1 && j != i) {
                flRow = false
              }
            }
          }
          if (flRow) {
            variants[i] = [v]
          }
          //убираем варианты из того же столбца
          let flCol = true
          let columnnumb = i % 9
          for (let j in variants) {
            if (columnnumb == j % 9) {
              for (let v1 of variants[j]) {
                if (v == v1 && j != i) {
                  flCol = false
                }
              }
            }
          }
          if (flCol) {
            variants[i] = [v]
          }
          //убираем варианты из того же квадрата
          let flSq = true
          let rowSqnumb = Math.floor(Math.floor(i / 9) / 3)
          let colSqumb = Math.floor(i % 9 / 3)
          for (let j in variants) {
            if (colSqumb == Math.floor(j % 9 / 3) && rowSqnumb == Math.floor(Math.floor(j / 9) / 3)) {
              for (let v1 of variants[j]) {
                if (v == v1 && j != i) {
                  flSq = false
                }
              }
            }
          }
          if (flSq) {
            variants[i] = [v]
          }

        }
      }
      let varlen1 = 0
      for (let i in variants) {
        varlen1 += variants[i].length
      }
      return varlen1

    }
    let lastO = 0
    let numO = 0
    let brFlag = false
    while (!done) {
      // console.log(numO)
      if (brFlag) break
      for (let i in variants) {
        let o = work(i)
        if (numO > 81) {
          brFlag = true
          break
        }
        if (o == lastO) {
          numO += 1
        }
        else {
          numO = 0
        }
        lastO = o
      }
    }
    return variants
  }
  function countVariants(variants) {
    let v = 0
    for (let i in variants) {
      v += variants[i].length
    }
    return v
  }
  function validateAnswer(variants) {
    for (let i in variants) {
      if (variants[i].length != 1 || variants[i][0] == 0 || variants[i][0] == "") return false
    }
    return true
  }
  variants = solveVariantsByRules(variants)
  let resultVariant = []
  let breakFlag = false
  let countRecursion = 0
  function enumeration(variants) {
    if (countVariants(variants) > 81) {
      for (let cell in variants) {
        if (breakFlag) break
        for (let variant in variants[cell]) {
          if (breakFlag) break

          if (variants[cell].length == 1) {
            continue
          }
          let variantsCopy = JSON.parse(JSON.stringify(variants))
          variantsCopy[cell] = [variants[cell][variant]]
          countRecursion++
          if (countRecursion > 50000) {
            breakFlag = true
            resultVariant = 0
          }
          let newVariants = solveVariantsByRules(variantsCopy)
          if (validateAnswer(newVariants)) {
            breakFlag = true
            resultVariant = newVariants
            return
          }
          else {
            if (ValidateVariants(newVariants)) enumeration(newVariants)
          }
        }
      }
    }
  }
  enumeration(variants)
  if (resultVariant === 0) {
    return false
  }
  if (resultVariant.length == 0) {
    resultVariant = variants
  }
  for (let i of resultVariant) {
    ans.push(i[0])
  }
  return ans
}
function ValidateVariants(variants) {
  variants = JSON.parse(JSON.stringify(variants))
  if (typeof variants[0] == "number") {
    for (let i in variants) {
      if (variants[i] == 0) {
      }
      variants[i] = [variants[i]]
    }
  }
  //убираем варианты из той же строки
  for (let cell in variants) {
    if (variants[cell].length != 1 || variants[cell] == 0) {
      continue
    }

    let rownumb = Math.floor(cell / 9)
    for (let j = rownumb * 9; j < (rownumb + 1) * 9; j++) {
      if (j != cell) {
        if (variants[cell][0] == variants[j][0] && variants[j].length == 1) {
          return false
        }
      }
    }

    //убираем варианты из того же столбца
    let columnnumb = cell % 9
    for (let j in variants) {
      if (columnnumb == j % 9) {
        if (j != cell) {
          if (variants[cell][0] == variants[j][0] && variants[j].length == 1) {
            return false
          }
        }
      }
    }

    //убираем варианты из того же квадрата
    let rowSqnumb = Math.floor(Math.floor(cell / 9) / 3)
    let colSqumb = Math.floor(cell % 9 / 3)
    for (let j in variants) {
      if (colSqumb == Math.floor(j % 9 / 3) && rowSqnumb == Math.floor(Math.floor(j / 9) / 3)) {
        if (j != cell) {
          if (variants[cell][0] == variants[j][0] && variants[j].length == 1) {
            return false
          }
        }
      }
    }
  }
  return true
}