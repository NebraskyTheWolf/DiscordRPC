/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileManager.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/02/05 23:43:57 by alle.roy          #+#    #+#             */
/*   Updated: 2023/02/06 00:04:08 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Profile, { IProfile } from "./Profile";
import ProfileLoader from "./ProfileLoader";

export declare type Response = {
    readonly status: boolean;
    readonly profile?: IProfile;
    readonly error?: Error;
    readonly ignore?: boolean;
}

export default class ProfileManager {
    private readonly profiles: Array<Profile>

    public constructor() {
        this.profiles = Array<Profile>()
    }

    public registerProfile(profile: Profile): void {
        this.profiles.push(profile)
    }

    public initLoader(): void {
        new ProfileLoader()
    }

    public getProfile(index: number): Response {
        const profile = this.profiles[index];
        if (profile !== null) {
            return {
                status: true,
                profile: profile
            }
        } else {
            return {
                status: false,
                error: new Error(`Profile #${index} is not found.`)
            }
        }
    }
}