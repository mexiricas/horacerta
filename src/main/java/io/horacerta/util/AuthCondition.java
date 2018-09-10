package io.horacerta.util;

import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.core.type.AnnotatedTypeMetadata;

public class AuthCondition implements Condition{

	@Override
	public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
		String[] profiles = context.getEnvironment().getActiveProfiles();
		for(int i = 0; i < profiles.length; i++) {
			if(profiles[i].equals("desenvolvedor")) {
				return false;
			}
		}
		return true;
	}
	
}
