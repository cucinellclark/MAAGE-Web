define([
  'dojo/_base/declare',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dojo/dom-class',
  'dojo/dom-style',
  'dojo/on',
  'dojo/topic',
], function (
  declare,
  WidgetBase,
  TemplatedMixin,
  domClass,
  domStyle,
  on,
  Topic
) {
  return declare([WidgetBase, TemplatedMixin], {
    baseClass: 'HomeInfoCard',
    templateString: '<div class="HomeInfoCard" data-dojo-attach-point="containerNode" data-dojo-attach-event="onclick:_onClick">' +
      '<div data-dojo-attach-point="titleNode"></div>' +
      '<div data-dojo-attach-point="subtitleNode"></div>' +
      '<div data-dojo-attach-point="footerNode"></div>' +
    '</div>',

    // Configurable properties
    title: '',
    subtitle: '',
    backgroundImg: '',
    footerContent: '',
    color: '',

    postCreate: function() {
      this.inherited(arguments);

      // Apply background image if provided
      if (this.backgroundImg) {
        domStyle.set(this.containerNode, {
          'background-image': 'url(' + this.backgroundImg + ')',
          'background-size': 'cover',
          'background-position': 'center'
        });
      }

      // Add default styling
      domStyle.set(this.containerNode, {
        'width': '200px',
        'height': '200px',
        'border-radius': '8px',
        'background-color': this.color,
        'box-shadow': '0 4px 8px rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.15)', // Enhanced shadow
        'padding': '20px',
        'display': 'flex',
        'flex-direction': 'column',
        'position': 'relative',
        'overflow': 'hidden',
        'cursor': 'pointer' // Add pointer cursor to indicate clickable
      });

      // Style title
      domStyle.set(this.titleNode, {
        'font-size': '24px',
        'font-weight': 'bold',
        'margin-bottom': '4px', // Reduced bottom margin
        'margin-top': '0', // Removed top margin
        'color': '#000000'
      });
      this.titleNode.innerHTML = this.title;

      // Style subtitle
      domStyle.set(this.subtitleNode, {
        'font-size': '16px',
        'color': '#000000',
        'margin-bottom': '8px' // Reduced bottom margin
      });
      this.subtitleNode.innerHTML = this.subtitle;

      // Style footer
      /*
      domStyle.set(this.footerNode, {
        'position': 'absolute', // Position absolutely
        'bottom': '16px', // Distance from bottom
        'left': '20px', // Align with left padding
        'right': '20px', // Align with right padding
        'color': 'red'
      });
      this.footerNode.innerHTML = this.footerContent;
      */
    },

    _onClick: function(evt) {
        Topic.publish("/navigate", {href:this.href })
    }
  });
});
