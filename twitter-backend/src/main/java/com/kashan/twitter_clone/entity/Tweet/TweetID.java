// package com.kashan.twitter_clone.entity.Tweet;

// import java.io.Serializable;

// import lombok.AllArgsConstructor;
// import lombok.Getter;
// import lombok.NoArgsConstructor;

// @NoArgsConstructor
// @AllArgsConstructor
// @Getter
// public class TweetID implements Serializable {
//     private Long posted_by;
//     private Long id;
    
//     // Generated by IDE
//     @Override
//     public int hashCode() {
//         final int prime = 31;
//         int result = 1;
//         result = prime * result + ((posted_by == null) ? 0 : posted_by.hashCode());
//         result = prime * result + ((id == null) ? 0 : id.hashCode());
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
//         TweetID other = (TweetID) obj;
//         if (posted_by == null) {
//             if (other.posted_by != null)
//                 return false;
//         } else if (!posted_by.equals(other.posted_by))
//             return false;
//         if (id == null) {
//             if (other.id != null)
//                 return false;
//         } else if (!id.equals(other.id))
//             return false;
//         return true;
//     }
// }
