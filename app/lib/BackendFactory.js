'use strict'

import { firebase } from './Firebase'

export default function BackendFactory (token = null) {
    return firebase
}
