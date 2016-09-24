'use babel';

import HexoFrontMatterView from './hexo-front-matter-view';
import { CompositeDisposable } from 'atom';
import moment from 'moment';

export default {

  hexoFrontMatterView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.hexoFrontMatterView = new HexoFrontMatterView(state.hexoFrontMatterViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.hexoFrontMatterView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'hexo-front-matter:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.hexoFrontMatterView.destroy();
  },

  serialize() {
    return {
      hexoFrontMatterViewState: this.hexoFrontMatterView.serialize()
    };
  },

  toggle() {
    console.log('HexoFrontMatter was toggled!');
    const editor = atom.workspace.getActivePaneItem();
    const date = moment().format('YYYY-MM-DD HH:mm:ss');
    const id = moment(date).format('X');
	
	var fileTitle = editor.getTitle();
	var pos = fileTitle.lastIndexOf(".");
	fileTitle = fileTitle.substring(0,pos===-1?fileTitle.length:pos)
	console.log(fileTitle);
	
    editor.insertText(`---
title: article
date: ${date}
id: ${id}
tags:
  - untagged
categories:
  - uncategorized
keywords: keyword1,keyword2
description: description
---`);
  }

};
