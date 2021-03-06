/*
 Copyright (C) 2014 Typesafe, Inc <http://typesafe.com>
 */
define([
  'widgets/header/header',
  'widgets/navigation/navigation',
  'widgets/panels/panels',
  'widgets/modals/modals',
  './layoutManager',
  'css!./layout'
], function(
  header,
  navigation,
  panels,
  modals,
  layoutManager
){

  var wrapper = $('<div id="app"><main/></div>');
  var State = {
    navigation: navigation,
    panels: panels,
    layoutManager: layoutManager
  }

  return {
    render: function() {
      $(document.body).attr('data-bind',"css: {'navigation-opened': layoutManager.navigationOpened, 'navigation-sneak': navigation.sneak, 'panel-opened': layoutManager.panelOpened}, attr: { 'data-shape': layoutManager.panelShape }");
      ko.applyBindings(State);

      document.body.appendChild(header);
      document.body.appendChild(navigation.render());
      document.body.appendChild(wrapper[0]);
      document.body.appendChild(panels.render());
      document.body.appendChild(modals.render());

      layoutManager.startLayout();
    },

    renderPlugin: function(body){
      $('#app main').replaceWith(body);
    }
  }
})
