$.ajax({
  url: "https://pokeapi.co/api/v2/pokemon/",
})
  .done((pokemon) => {
    console.log(pokemon.results);
    let text = "";
    $.each(pokemon.results, function (key, val) {
      $.ajax({
        url: val.url,
      })
        .done((image) => {
          text += `
          <div class="card" style="width: 12rem" align="center">
            <img src="${image.sprites.other["official-artwork"].front_default}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${val.name}</h5>
              <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#exampleModal" onclick="detail('${val.url}')">view details</button>
            </div>
          </div>`;
          $("#container-body").html(text);
        })
        .fail((error) => {
          console.log(error);
        });
    });
  })
  .fail((error) => {
    console.log(error);
  });

function detail(urlDetails) {
  $.ajax({
    url: urlDetails,
  })
    .done((details) => {
      console.log(details);
      let result = "";

      //Types
      let types = [];
      for (let i = 0; i < details.types.length; i++) {
        const type = details.types[i].type.name;
        types.push(type);
      }
      console.log(types);
      const listOfTypes = types.map((x, i) => `<p>${(i + 1) % 2 != 0 ? `<a href="#" class="badge badge-info">${x}</a>` : `<a href="#" class="badge badge-secondary">${x}</a>`}</p>`);

      //Ability
      let abilities = [];
      for (let i = 0; i < details.abilities.length; i++) {
        const ability = details.abilities[i].ability.name;
        abilities.push(ability);
      }
      console.log(abilities);
      const listOfAbilities = abilities.map((x, i) => `<p>${i == details.abilities.length - 1 ? `<a href="#" class="badge badge-light">${x}</a>` : `<a href="#" class="badge badge-light">${x},</a>`}</p>`);

      //Move
      let moves = [];
      for (let i = 0; i < details.moves.length; i++) {
        const move = details.moves[i].move.name;
        moves.push(move);
      }
      console.log(moves);
      const listOfMoves = moves.map((x, i) => `<p>${i == details.moves.length - 1 ? `<a href="#" class="badge badge-light">${x}</a>` : `<a href="#" class="badge badge-light">${x},</a>`}</p>`);

      result = `<div class="details-element" align="center">
                    <img src="${details.sprites.other["official-artwork"].front_default}" width="200">
                    <h3>${details.name}</h3>
                </div>
                <div class="detail-types" align="center">
                    <p>${listOfTypes.join("")}</p>
                </div>
                <div class="tabs-element">
                  <nav>
                    <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                      <button class="nav-link active" id="nav-home-tab" data-toggle="tab" data-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">stats</button>
                      <button class="nav-link" id="nav-profile-tab" data-toggle="tab" data-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">info</button>
                      <button class="nav-link" id="nav-contact-tab" data-toggle="tab" data-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">moves</button>
                    </div>
                  </nav>
                  <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                      <div id="statsTab">
                        <div class="progress">
                          <div class="progress-bar bg-success" role="progressbar" style="width: ${details.stats[0].base_stat}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                            <span align="left">${details.stats[0].stat.name}</span>
                          </div>
                        </div>
                        <div class="progress">
                          <div class="progress-bar bg-info" role="progressbar" style="width: ${details.stats[1].base_stat}%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                            <span align="left">${details.stats[1].stat.name}</span>
                          </div>
                        </div>
                        <div class="progress">
                          <div class="progress-bar bg-warning" role="progressbar" style="width: ${details.stats[2].base_stat}%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <span align="left">${details.stats[2].stat.name}</span>
                          </div>
                        </div>
                        <div class="progress">
                          <div class="progress-bar bg-danger" role="progressbar" style="width: ${details.stats[3].base_stat}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                            <span align="left">${details.stats[3].stat.name}</span>
                          </div>
                        </div>
                        <div class="progress">
                          <div class="progress-bar bg-secondary" role="progressbar" style="width: ${details.stats[4].base_stat}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                            <span align="left">${details.stats[4].stat.name}</span>
                          </div>
                        </div>
                        <div class="progress">
                          <div class="progress-bar bg-primary" role="progressbar" style="width: ${details.stats[5].base_stat}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                            <span align="left">${details.stats[5].stat.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                      <div id="abilityTab">
                        <table class="table table-sm">
                          <tbody>
                            <tr>
                              <th scope="row">height</th>
                              <td>:</td>
                              <td>${details.height}</td>
                            </tr>
                            <tr>
                              <th scope="row">weight</th>
                              <td>:</td>
                              <td>${details.weight}</td>
                            </tr>
                            <tr>
                              <th scope="row">base experience</th>
                              <td>:</td>
                              <td>${details.base_experience}</td>
                            </tr>
                            <tr>
                              <th scope="row">abilities</th>
                              <td>:</td>
                              <td>${listOfAbilities.join("")}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                      <div id="moveTab">
                        <p>${listOfMoves.join("")}<p>
                      </div>
                    </div>
                  </div>
                </div>`;
      $(".modal-body").html(result);
    })
    .fail((error) => {
      console.log(error);
    });
}
