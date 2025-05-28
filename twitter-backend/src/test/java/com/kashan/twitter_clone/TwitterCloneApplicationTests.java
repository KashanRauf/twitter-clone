package com.kashan.twitter_clone;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;

import com.kashan.twitter_clone.controller.TestController;

// Spring tests caches application contexts between tests, so later tests won't incur as much cost (control cache with @DirtiesContext)
@SpringBootTest(webEnvironment = WebEnvironment.DEFINED_PORT) // Requires a webEnvironment to load TestTestTemplate, default port is 8080
class TwitterCloneApplicationTests {

	@LocalServerPort
	private int port;

	@Autowired
	private TestRestTemplate testRest;

	@Autowired
	private TestController testController;

	// This is used as a sanity check to ensure the app successfully runs
	@Test
	void contextLoads() throws Exception {
		assert((testController) != null);
		assert(this.testRest.getForObject("http://127.0.0.1:" + port + "/api/test", String.class).contains("Hello, World!"));
	}
}
