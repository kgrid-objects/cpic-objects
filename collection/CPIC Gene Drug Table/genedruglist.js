var drugkolist = {
  'abacavir': '/99999/fk45m7fn9t/1.0',
  'allopurinol':'/99999/fk4058s74p/1.0',
  'amitriptyline': '/99999/fk4t167482/1.0',
  'atazanavir': '/99999/fk4d79nq4z/1.0',
  'azathioprine':'/99999/fk4r225c4h/1.0',
  'carbamazepine':'/99999/fk4mw3nw5p/1.0',
  'citalopram': '/99999/fk4d22836k/1.0',
  'clomipramine':'/99999/fk4w67pr0f/1.0',
  'clopidogrel': '/99999/fk4bz6hp15/1.0',
  'codeine': '/99999/fk4mc97w6m/1.0',
  'desipramine':'/99999/fk4rf6zx6d/1.0',
  'doxepin':'/99999/fk4sf40t7f/1.0',
  'escitalopram': '/99999/fk4d22836l/1.0',
  'fluvoxamine':'/99999/cp4mc9723sd/1.0',
  'imipramine':'/99999/fk4d51vd1p/1.0',
  'mercaptopurine':'/99999/fk4m91fj9z/1.0',
  'nortriptyline':'/99999/fk44n0ds5c/1.0',
  'ondansetron':'/99999/fk4c83hw23/1.0',
  'oxcarbazepine':'/99999/fk4qc17m5z/1.0',
  'paroxetine':'/99999/cp4mc9723se/1.0',
  'phenytoin': '/99999/fk4qz3fz89/1.0',
  'sertraline':'/99999/fk40k3kt35/1.0',
  'simvastatin': '/99999/fk4m95ek9z/1.0',
  'tacrolimus':'/99999/fk4t85em9x/1.0',
  'thioguanine':'/99999/fk4cx5fm8f/1.0',
  'trimipramine':'/99999/fk4jw9m41b/1.0',
  'tropisetron':'/99999/fk4fn2d721/1.0',
  'voriconazole':'/99999/fk4cz4fm8f/1.0'
}

function druglist (inputs) {
  var list = {}
  var isEmpty = true
  for (var key in inputs) {
    if (inputs[key]!=null) {
      isEmpty = isEmpty && false
    }
  }
  if (isEmpty) {
    return drugkolist
  } else {

    for (var key in inputs) {
      list[key] = drugkolist[key]
    }
    return list
  }
}
