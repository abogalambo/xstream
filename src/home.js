import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import helloWorld from './hello-world.js';
import './heyho.css';

import FormContainer from "./js/components/smart/FormContainer";
import React from "react";
import ReactDOM from "react-dom";

helloWorld();
library.add(faSpinner);
dom.watch()

var i = document.createElement('i');
i.className = "fas fa-spinner fa-spin";
document.body.appendChild(i);

const wrapper = document.getElementById("react-root");
ReactDOM.render(<FormContainer />, wrapper);
