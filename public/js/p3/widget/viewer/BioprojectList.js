define ([
    'dojo/_base/declare', 'dojo/_base/lang', 'dojo/topic',
    './TabViewerBase', '../GenomeListOverview', '../GenomeGridContainer',
    '../../util/QueryToEnglish', '../../DataAPI', '../AMRPanelGridContainer', '../SequenceGridContainer',
    '../FeatureGridContainer', '../ProteinGridContainer', '../SpecialtyGeneGridContainer',
    '../PathwayGridContainer', '../SubsystemGridContainer'
], function (
    declare, lang, Topic,
    TabViewerBase, GenomeListOverview, GenomeGridContainer,
    QueryToEnglish, DataAPI, AMRPanelGridContainer, SequenceGridContainer,
    FeatureGridContainer, ProteinGridContainer, SpecialtyGeneGridContainer,
    PathwayGridContainer, SubsystemGridContainer
) {
    /*
    Notes:
    - This is nearly the same as GenomeList, but with a different title
    - Uses a bioproject_accession query to suppport the genome filter
    - need to figure out bioproject_accession context before encorporating it into the view
    - Then modify Grid scripts for the "Tabs" as needed
    - They each perform a query at the memory store level, but they do not have bioproject_accession supported
        as a query parameter
    */

    return declare([TabViewerBase], {
        perspectiveLabel: 'Bioproject List View',
        defaultTab: 'genomes',
        createOverviewPanel: function () {
            return new GenomeListOverview({
                content: 'Genome List Overview',
                title: 'Overview',
                id: this.viewer.id + '_overview'
            });
        },
        onSetState: function (attr, oldVal, state) {
            this.inherited(arguments);
            if (!this.query) {
                this.set('query', state.search);
            } else {
                if (this.query !== state.search && state.search !== '') {
                this.set('query', state.search);
                }
            }
                if (this.state.search === '' && this.query !== '') {
                    this.state.search = this.query
                }

            // update genome count on header
            DataAPI.query('genome', state.search, { select: ['genome_id', 'bioproject_accession'] })
                .then(lang.hitch(this, (res) => {
                this._set('total_genomes', res.total_items);
                }))

            this.setActivePanelState();
        },
        onSetQuery: function (attr, oldVal, newVal) {
            const q = newVal.split('&').filter(op => op.includes('genome(')).map(op => {
              const part = op.replace('genome(', '')
              return part.substring(0, part.length - 1)
            }).join('')

            const content = QueryToEnglish(q);
            this.queryNode.innerHTML = '<span class="queryModel">Genomes: </span>  ' + content;
        },
        onSetTotalGenomes: function (attr, oldVal, newVal) {
            this.totalCountNode.innerHTML = ' ( ' + newVal + ' Genomes ) ';
        },
        setActivePanelState: function () {
            var active = (this.state && this.state.hashParams && this.state.hashParams.view_tab) ? this.state.hashParams.view_tab : this.defaultTab;
            var activeTab = this[active];

            if (!activeTab) {
              console.log('ACTIVE TAB NOT FOUND: ', active)
              return;
            }
            const activeQueryState = lang.mixin({}, this.state, { hashParams: lang.mixin({}, this.state.hashParams) })

            activeTab.set('state', activeQueryState)

            if (activeTab) {
              var pageTitle = 'Genome List ' + activeTab.title + ' | BV-BRC';
              if (window.document.title !== pageTitle) {
                window.document.title = pageTitle;
              }
            }
        },
        onSetAnchor: function (evt) {
            console.log('genome list onSetAnchor: ', evt)
            evt.stopPropagation();
            evt.preventDefault();

            var parts = [];
            var q;
            if (this.query) {
              q = (this.query.charAt(0) == '?') ? this.query.substr(1) : this.query;
              if (q != 'keyword(*)') {
                parts.push(q);
              }
            }
            if (evt.filter && evt.filter != 'false') {
              parts.push(evt.filter);
            }

            if (parts.length > 1) {
              q = '?and(' + parts.join(',') + ')';
            } else if (parts.length == 1) {
              q = '?' + parts[0];
            } else {
              q = '';
            }

            var hp;
            if (this.state.hashParams && this.state.hashParams.view_tab) {
              hp = { view_tab: this.state.hashParams.view_tab };
            } else {
              hp = {};
            }

            hp.filter = 'false';

            var l = window.location.pathname + q + '#' + Object.keys(hp).map(function (key) {
              return key + '=' + hp[key];
            }, this).join('&');
            console.log(`navigate to ${l}`)
            Topic.publish('/navigate', { href: l });
        },
        postCreate: function () {
            this.inherited(arguments)

            this.watch('query', lang.hitch(this, 'onSetQuery'))
            this.watch('total_genomes', lang.hitch(this, 'onSetTotalGenomes'))

            this.overview = this.createOverviewPanel()
            this.genomes = new GenomeGridContainer({
              title: 'Genomes',
              id: this.viewer.id + '_genomes',
              state: this.state,
              disable: false
            });

            this.sequences = new SequenceGridContainer({
              title: 'Sequences',
              id: this.viewer.id + '_sequences',
              state: this.state,
              disable: false
            });

            this.amr = new AMRPanelGridContainer({
              title: 'AMR Phenotypes',
              id: this.viewer.id + '_amr',
              disabled: false,
              state: this.state
            });

            this.features = new FeatureGridContainer({
              title: 'Features',
              id: this.viewer.id + '_features',
              disabled: false
            });

            this.proteins = new ProteinGridContainer({
              title: 'Proteins',
              id: this.viewer.id + '_proteins',
              disabled: false
            });
            this.specialtyGenes = new SpecialtyGeneGridContainer({
              title: 'Specialty Genes',
              id: this.viewer.id + '_specialtyGenes',
              disabled: false,
              state: this.state
            });
            this.pathways = new PathwayGridContainer({
              title: 'Pathways',
              id: this.viewer.id + '_pathways',
              disabled: false
            });

            this.subsystems = new SubsystemGridContainer({
              title: 'Subsystems',
              id: this.viewer.id + '_subsystems',
              disabled: false
            });

            // this.proteinFamilies = new ProteinFamiliesContainer({
            //   title: 'Protein Families',
            //   id: this.viewer.id + '_proteinFamilies',
            //   disabled: false
            // });
            // this.experiments = new ExperimentsContainer({
            //   title: 'Experiments',
            //   id: this.viewer.id + '_experiments',
            //   disabled: false,
            //   state: this.state
            // })

            this.viewer.addChild(this.overview)
            this.viewer.addChild(this.genomes)
            this.viewer.addChild(this.sequences);
            this.viewer.addChild(this.amr);
            this.viewer.addChild(this.features);
            this.viewer.addChild(this.proteins);
            this.viewer.addChild(this.specialtyGenes);
            this.viewer.addChild(this.pathways);
            this.viewer.addChild(this.subsystems);
        }
    });
});
