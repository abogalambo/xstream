import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import helloWorld from './hello-world.js';
import React from 'react';
import './heyho.css';

React
helloWorld();
library.add(faSpinner);
dom.watch()

var i = document.createElement('i');
i.className = "fas fa-spinner fa-spin";
document.body.appendChild(i);