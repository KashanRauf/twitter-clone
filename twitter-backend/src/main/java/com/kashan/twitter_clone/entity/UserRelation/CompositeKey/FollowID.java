// package com.kashan.twitter_clone.entity.UserRelation.CompositeKey;

// import java.io.Serializable;

// import lombok.AllArgsConstructor;
// import lombok.Getter;
// import lombok.NoArgsConstructor;

// @NoArgsConstructor
// @AllArgsConstructor
// @Getter
// public class FollowID implements Serializable {
//     private Long follower;
//     private Long followed;
    
//     // Generated by IDE
//     @Override
//     public int hashCode() {
//         final int prime = 31;
//         int result = 1;
//         result = prime * result + ((follower == null) ? 0 : follower.hashCode());
//         result = prime * result + ((followed == null) ? 0 : followed.hashCode());
//         return result;
//     }
//     @Override
//     public boolean equals(Object obj) {
//         if (this == obj)
//             return true;
//         if (obj == null)
//             return false;
//         if (getClass() != obj.getClass())
//             return false;
//         FollowID other = (FollowID) obj;
//         if (follower == null) {
//             if (other.follower != null)
//                 return false;
//         } else if (!follower.equals(other.follower))
//             return false;
//         if (followed == null) {
//             if (other.followed != null)
//                 return false;
//         } else if (!followed.equals(other.followed))
//             return false;
//         return true;
//     }

    
// }
