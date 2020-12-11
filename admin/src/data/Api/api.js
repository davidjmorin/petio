const apiUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:7778'
		: `${window.location.protocol}//${window.location.host}/api`;

export async function popular() {
	let request = `${apiUrl}/trending`;
	return call(request).then((res) => res.json());
}

export function top(type) {
	let request = `${apiUrl}/top/shows`;
	if (type === 'movie') {
		request = `${apiUrl}/top/movies`;
	}
	return call(request).then((res) => res.json());
}

export function history(user_id, type) {
	let body = {
		id: user_id,
		type: type,
	};
	let headers = { 'Content-Type': 'application/json' };
	let request = `${apiUrl}/history`;
	return call(request, headers, 'post', body).then((res) => res.json());
}

export function getBandwidth() {
	let headers = { 'Content-Type': 'application/json' };
	let request = `${apiUrl}/history/bandwidth`;
	return call(request, headers, 'get').then((res) => res.json());
}

export function getServerInfo() {
	let headers = { 'Content-Type': 'application/json' };
	let request = `${apiUrl}/history/server`;
	return call(request, headers, 'get').then((res) => res.json());
}

export function getCurrentSessions() {
	let headers = { 'Content-Type': 'application/json' };
	let request = `${apiUrl}/sessions`;
	return call(request, headers, 'get').then((res) => res.json());
}

export function get_plex_media(id, type) {
	let request = `${apiUrl}/plex/lookup/${type}/${id}`;
	return call(request).then((res) => res.json());
}

export function movie(id = false, minified) {
	if (!id) {
		return false;
	}
	let request = `${apiUrl}/movie/lookup/${id}`;
	if (minified) {
		request = `${apiUrl}/movie/lookup/${id}/minified`;
	}
	return call(request).then((res) => res.json());
}

export function series(id = false, minified) {
	if (!id) {
		return false;
	}
	let request = `${apiUrl}/show/lookup/${id}`;
	if (minified) {
		request = `${apiUrl}/show/lookup/${id}/minified`;
	}
	return call(request).then((res) => res.json());
}

export function person(id = false) {
	if (!id) {
		return false;
	}
	let request = `${apiUrl}/person/lookup/${id}`;
	return call(request).then((res) => res.json());
}

export async function search(title = false) {
	let request = `${apiUrl}/search/${encodeURI(title)}`;
	return call(request).then((res) => res.json());
}

export function actor(id = false) {
	if (!id) {
		return false;
	}
	let request = `${apiUrl}/person/lookup/${id}`;
	return call(request).then((res) => res.json());
}

export let checkConfig = () => {
	let request = `${apiUrl}/config`;
	return call(request).then((res) => res.json());
};

export let saveConfig = (config) => {
	let request = `${apiUrl}/setup/set`;
	let headers = {
		'Content-Type': 'application/json',
	};
	let body = config;
	return call(request, headers, 'post', body);
};

export function sonarrConfig() {
	let headers = { 'Content-Type': 'application/json' };
	let request = `${apiUrl}/services/sonarr/config`;
	return call(request, headers, 'get').then((res) => res.json());
}

export let saveSonarrConfig = (config) => {
	let request = `${apiUrl}/services/sonarr/config`;
	let headers = {
		'Content-Type': 'application/json',
	};
	let body = config;
	return call(request, headers, 'post', body);
};

export function testSonarr() {
	let headers = { 'Content-Type': 'application/json' };
	let request = `${apiUrl}/services/sonarr/test`;
	return call(request, headers, 'get').then((res) => res.json());
}

export function sonarrPaths() {
	let headers = { 'Content-Type': 'application/json' };
	let request = `${apiUrl}/services/sonarr/paths`;
	return call(request, headers, 'get').then((res) => res.json());
}

export function sonarrProfiles() {
	let headers = { 'Content-Type': 'application/json' };
	let request = `${apiUrl}/services/sonarr/profiles`;
	return call(request, headers, 'get').then((res) => res.json());
}

export function radarrConfig() {
	let headers = { 'Content-Type': 'application/json' };
	let request = `${apiUrl}/services/radarr/config`;
	return call(request, headers, 'get').then((res) => res.json());
}

export function radarrPaths() {
	let headers = { 'Content-Type': 'application/json' };
	let request = `${apiUrl}/services/radarr/paths`;
	return call(request, headers, 'get').then((res) => res.json());
}

export function radarrProfiles() {
	let headers = { 'Content-Type': 'application/json' };
	let request = `${apiUrl}/services/radarr/profiles`;
	return call(request, headers, 'get').then((res) => res.json());
}

export function testRadarr() {
	let headers = { 'Content-Type': 'application/json' };
	let request = `${apiUrl}/services/radarr/test`;
	return call(request, headers, 'get').then((res) => res.json());
}

export let saveRadarrConfig = (config) => {
	let request = `${apiUrl}/services/radarr/config`;
	let headers = {
		'Content-Type': 'application/json',
	};
	let body = config;
	return call(request, headers, 'post', body);
};

export let saveEmailConfig = (config) => {
	let request = `${apiUrl}/mail/create`;
	let headers = {
		'Content-Type': 'application/json',
	};
	let body = { email: config };
	return call(request, headers, 'post', body);
};

export let getEmailConfig = (config) => {
	let request = `${apiUrl}/mail/config`;
	let headers = {
		'Content-Type': 'application/json',
	};
	return call(request, headers, 'get').then((res) => res.json());
};

function call(url, headers, method, body = null) {
	let args = {
		method: method,
		headers: headers,
	};

	if (method === 'post') {
		args.body = JSON.stringify(body);
	}

	return fetch(url, args);
}
