//
// Copyright (C) 2018 Glencoe Software, Inc.
// All rights reserved.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//

import axios from 'axios';
import qs from 'qs';

import config from '../config'

class ThumbnailLoader {

    constructor() {
        this.last = new Promise((resolve, reject) => {
            resolve();
        })
    }

    getThumbnails(imageIds, successCallback, failureCallback, cancelToken) {
        const thumbnailsBatch = config.thumbnailsBatch;
        this.last = this.last.then(() => {
            const promises = [];
            for (let i = 0, j = imageIds.length; i < j; i += thumbnailsBatch) {
                promises.push(this.loadThumbnails(
                    imageIds.slice(i, i + thumbnailsBatch),
                    successCallback, failureCallback, cancelToken
                ));
            }
            return Promise.all(promises);
        });
        return this.last;
    }

    loadThumbnails(imageIds, successCallback, failureCallback, cancelToken) {
        return axios.get(config.webgatewayBaseUrl + 'get_thumbnails/', {
            cancelToken: cancelToken,
            params: {'id': imageIds},
            paramsSerializer: params => (
                qs.stringify(params, { indices: false })
            )
        })
            .then(successCallback, failureCallback);
    }

}

export default ThumbnailLoader
