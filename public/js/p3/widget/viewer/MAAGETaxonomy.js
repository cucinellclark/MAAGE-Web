define([
    'dojo/_base/declare', 'dojo/_base/Deferred', 'dojo/request', './Taxonomy'
], function (
  declare, Deferred, xhr, Taxonomy
) {
  return declare([Taxonomy], {
    /*
    params: null,
    taxon_id: '',
    apiServiceUrl: window.App.dataAPI,
    taxonomy: null,
    context: 'bacteria',
    perspectiveLabel: 'Taxon View',
    perspectiveIconClass: 'icon-selection-Taxonomy',
    */
   //in(genus,(Campylobacter,Listeria,Escherichia,Salmonella))&
    buildTaxonIdByState: function (state) {
        var def = new Deferred();
        var parts = state.pathname.split('/');
        debugger;
        var taxon_id_or_name = parts[parts.length - 1];
        if (taxon_id_or_name == parseInt(taxon_id_or_name)) {
          def.resolve(parseInt(taxon_id_or_name));
        }
        else {
          xhr.post(PathJoin(this.apiServiceUrl, 'taxonomy'), {
            headers: {
              accept: 'application/json',
              'content-type': 'application/rqlquery+x-www-form-urlencoded',
              'X-Requested-With': null,
              Authorization: (window.App.authorizationToken || '')
            },
            data: 'eq(taxon_name,' + taxon_id_or_name + ')&in(taxon_rank,(genus,species))&select(taxon_id,taxon_name,taxon_rank)&limit(1)',
            handleAs: 'json'
          }).then(function (data) {
            if (data.length == 0) {
              def.reject('Failed to load corresponding taxonomy: ' + taxon_id_or_name);
            } else {
              def.resolve(data[0].taxon_id);
            }
          });
        }
        return def;
      }
  });
});

